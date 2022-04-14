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
const SOCKET_URL = 'ws://09e6-123-143-18-134.ngrok.io/ws/call/test';

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
    // FIXME: candidate type 지정
    pc.onicecandidate = event => {
      const {candidate} = event;
      ws.send(makeMessage('ice', candidate));
      console.log('ICE 전송');
    };

    // FIXME: stream type 지정 / local, remote 구분 필요
    pc.onaddstream = event => {
      console.log('애드스트림 이벤트', event);
      const {stream: rmStream} = event;
      setRemoteStream(rmStream);
    };

    ws.onopen = () => {
      console.log('웹소켓서버와 연결 성공');
    };

    ws.onclose = () => {
      Alert.alert('연결이 종료되었습니다');
    };

    ws.onerror = error => {
      Alert.alert('연결이 종료되었습니다');
      if (error instanceof Error) {
        console.log(error.message);
      } else {
        console.log(String(error));
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
            console.log('answer를 보냈습니다');
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

  const sendCall = async () => {
    const offer: RTCSessionDescription = await pc.createOffer();
    pc.setLocalDescription(offer);
    ws.send(makeMessage('offer', offer));
    console.log('offer를 보냈습니다');
  };

  const initCall = () => {
    getMedia();
    makeConnection();
    setTimeout(() => sendCall(), 8000);
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
