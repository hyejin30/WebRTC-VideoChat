import {useEffect, useRef, useState} from 'react';
import {Alert} from 'react-native';
import {
  RTCPeerConnection,
  mediaDevices,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidate,
} from 'react-native-webrtc';
import {
  TURN_SERVER,
  SOCKET_SERVER,
  CONFIG_USERNAME,
  CONFIG_CREDENTIAL,
} from '@env';

const configuration = {
  iceServers: [
    {
      urls: [TURN_SERVER],
      username: CONFIG_USERNAME,
      credential: CONFIG_CREDENTIAL,
    },
  ],
};

const useMySocket = () => {
  const ws = useRef(new WebSocket(SOCKET_SERVER));
  const pc = useRef(new RTCPeerConnection(configuration));
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);
  const [isVideoFront, setIsVideoFront] = useState(true);

  const getMedia = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: isAudio,
        video: isVideo
          ? {
              frameRate: 30,
              facingMode: isVideoFront ? 'user' : 'environment',
            }
          : false,
      });
      setLocalStream(stream);
      pc.current.addStream(stream);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert(String(error));
      }
    }
  };

  const makeMessage = (
    type: string,
    data?: RTCSessionDescription | RTCIceCandidate | string,
  ) => {
    const event = {type, data};
    return JSON.stringify(event);
  };

  const makeConnection = () => {
    pc.current.onicecandidate = event => {
      const {candidate} = event;
      ws.current.send(makeMessage('ice', candidate));
    };

    pc.current.onaddstream = event => {
      const {stream: rmStream} = event;
      setRemoteStream(rmStream);
    };

    ws.current.onopen = () => {
      Alert.alert('연결 성공');
    };

    ws.current.onclose = () => {
      Alert.alert('연결이 종료되었습니다');
    };

    ws.current.onerror = error => {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert(String(error));
      }
    };

    ws.current.onmessage = (event: WebSocketMessageEvent) => {
      const {type, data} = JSON.parse(event.data);

      switch (type) {
        case 'offer':
          (async function (offer: RTCSessionDescription) {
            pc.current.setRemoteDescription(offer);
            const answer: RTCSessionDescription =
              await pc.current.createAnswer();
            pc.current.setLocalDescription(answer);
            ws.current.send(makeMessage('answer', answer));
          })(data);
          break;

        case 'answer':
          ((answer: RTCSessionDescription) => {
            pc.current.setRemoteDescription(answer);
          })(data);
          break;

        case 'ICE':
          ((ice: RTCIceCandidate) => {
            pc.current.addIceCandidate(ice);
          })(data);
          break;
      }
    };
  };

  const sendOffer = async () => {
    try {
      const offer: RTCSessionDescription = await pc.current.createOffer();
      pc.current.setLocalDescription(offer);
      ws.current.send(makeMessage('offer', offer));
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert(String(error));
      }
    }
  };

  const initCall = async () => {
    await getMedia();
    makeConnection();
    sendOffer();
  };

  useEffect(() => {
    initCall();
  }, []);

  useEffect(() => {
    getMedia();
  }, [isVideoFront, isVideo, isAudio]);

  return {
    localStream,
    remoteStream,
    isVideoFront,
    isVideo,
    isAudio,
    setIsVideoFront,
    setIsVideo,
    setIsAudio,
  };
};

export default useMySocket;
