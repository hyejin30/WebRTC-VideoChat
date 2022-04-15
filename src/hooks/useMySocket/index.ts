import {useEffect, useState} from 'react';
import {
  RTCPeerConnection,
  mediaDevices,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidate,
} from 'react-native-webrtc';
import {Alert} from 'react-native';

// FIXME: .env 재설정
// import Config from 'react-native-config';
// const TURN_SERVER: string = Config.TURN_SERVER_URL;
// const SOCKET_URL: string = Config.SOCKET_URL;

const TURN_SERVER = 'turn:54.180.143.248';
const SOCKET_URL = 'ws://6a70-49-165-97-104.ngrok.io/ws/call/test';

// FIXME: username, credential 숨기기
const configuration = {
  iceServers: [
    {
      urls: [TURN_SERVER],
      username: 'robbins4bos',
      credential: 'robbins4bos',
    },
  ],
};

const ws = new WebSocket(SOCKET_URL);
const pc = new RTCPeerConnection(configuration);

const useMySocket = () => {
  const [isAudio, setIsAudio] = useState(true);
  const [isVideo, setIsVideo] = useState(true);
  const [isVideoFront, setIsVideoFront] = useState(true);
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

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
      pc.addStream(stream);
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
    pc.onicecandidate = event => {
      const {candidate} = event;
      ws.send(makeMessage('ice', candidate));
    };

    pc.onaddstream = event => {
      const {stream: rmStream} = event;
      setRemoteStream(rmStream);
    };

    ws.onopen = () => {
      Alert.alert('연결 성공');
    };

    ws.onclose = () => {
      Alert.alert('연결이 종료되었습니다');
    };

    ws.onerror = error => {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert(String(error));
      }
    };

    ws.onmessage = (event: WebSocketMessageEvent) => {
      const {type, data} = JSON.parse(event.data);

      switch (type) {
        case 'offer':
          (async function (offer: RTCSessionDescription) {
            pc.setRemoteDescription(offer);
            const answer: RTCSessionDescription = await pc.createAnswer();
            pc.setLocalDescription(answer);
            ws.send(makeMessage('answer', answer));
          })(data);
          break;

        case 'answer':
          (async (answer: RTCSessionDescription) => {
            pc.setRemoteDescription(answer);
          })(data);
          break;

        case 'ICE':
          ((ice: RTCIceCandidate) => {
            pc.addIceCandidate(ice);
          })(data);
          break;
      }
    };
  };

  const sendOffer = async () => {
    const offer: RTCSessionDescription = await pc.createOffer();
    pc.setLocalDescription(offer);
    ws.send(makeMessage('offer', offer));
  };

  const initCall = () => {
    getMedia();
    makeConnection();
    setTimeout(() => sendOffer(), 8000);
  };

  useEffect(() => {
    initCall();
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
