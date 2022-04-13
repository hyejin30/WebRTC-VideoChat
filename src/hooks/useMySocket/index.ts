import {useEffect, useState} from 'react';
import {
  RTCPeerConnection,
  mediaDevices,
  MediaStream,
  RTCSessionDescription,
  RTCIceCandidate,
} from 'react-native-webrtc';
import {Alert} from 'react-native';
// import Config from 'react-native-config';
// const TURN_SERVER: string = Config.TURN_SERVER_URL;
// const SOCKET_URL: string = Config.SOCKET_URL;

const TURN_SERVER = 'turn:54.180.143.248';
const SOCKET_URL =
  'wss://connect.websocket.in/v3/1?api_key=oCdCMcMPQpbvNjUIzqtvF1d2X2okWpDQj4AwARJuAgtjhzKxVEjQU6IdCjwm&notify_self';

const configuration = {
  iceServers: [
    {
      urls: [TURN_SERVER],
      username: 'robbins4bos',
      credential: 'robbins4bos',
    },
  ],
};

const useMySocket = () => {
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isFrontVideo, setIsFrontVideo] = useState(true);
  const ws = new WebSocket(SOCKET_URL);
  const pc = new RTCPeerConnection(configuration);
  console.log('localStream :', localStream);
  console.log('remoteStream :', remoteStream);

  // FIXME: event type <string>
  pc.onicecandidate = event => {
    console.log(event);
    const {candidate} = event;
    if (candidate) {
      ws.send(makeMessage('ice', candidate));
    }
  };

  // FIXME: event type <string>
  pc.onaddstream = event => {
    console.log(event);
    const {stream} = event;
    setRemoteStream(stream);
  };

  const getMedia = async () => {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          frameRate: 30,
          facingMode: isFrontVideo ? 'user' : 'environment',
        },
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
    payload: RTCSessionDescription | RTCIceCandidate | string,
  ) => {
    const msg = {type, data: payload};
    return JSON.stringify(msg);
  };

  const makeConnection = () => {
    console.log('websocket :', ws);
    console.log('pc :', pc);

    ws.onopen = () => {
      console.log('웹소켓서버와 연결 성공');
      console.log('websocket :', ws);
    };

    ws.onclose = () => {
      Alert.alert('연결이 종료되었습니다');
    };

    ws.onerror = error => {
      console.log('error :', error);
    };

    ws.onmessage = ({data}) => {
      const message = JSON.parse(data);
      switch (message.type) {
        case 'welcome':
          async () => {
            const offer: RTCSessionDescription = await pc.createOffer();
            pc.setLocalDescription(offer);
            ws.send(makeMessage('offer', offer));
          };
          break;
        case 'offer':
          async (offer: RTCSessionDescription) => {
            pc.setRemoteDescription(offer);
            const answer: RTCSessionDescription = await pc.createAnswer();
            pc.setLocalDescription(answer);
            ws.send(makeMessage('answer', answer));
          };
          break;
        case 'answer':
          (answer: RTCSessionDescription) => {
            pc.setRemoteDescription(answer);
          };
          break;
        case 'ICE':
          (ice: RTCIceCandidate) => {
            pc.addIceCandidate(ice);
          };
          break;
      }
    };
  };

  const initCall = async () => {
    await getMedia();
    makeConnection();
  };

  useEffect(() => {
    initCall();
  }, []);

  return {localStream, remoteStream};
};

export default useMySocket;
