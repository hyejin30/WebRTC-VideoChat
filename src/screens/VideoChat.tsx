import React from 'react';
import {RTCView} from 'react-native-webrtc';
import styled from 'styled-components/native';
import {RootStackParamList, VideoChatScreenProps} from '~/types/dataTypes';
import {btnCameraReverse, btnVideoOn, btnAudioOff} from '~/assets/images';
import {Pressable} from 'react-native';
import {useMySocket} from '~/hooks';

function VideoChat({navigation}: VideoChatScreenProps) {
  const {localStream, remoteStream} = useMySocket();

  const changeScreen = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <ContainerView>
      <MyRTCView
        objectFit="cover"
        streamURL={localStream ? localStream.toURL() : ''}
      />
      <ExitButton onPress={() => changeScreen('Entry')}>
        <ButtonText>나가기</ButtonText>
      </ExitButton>
      <RemoteRTCView
        objectFit="cover"
        streamURL={remoteStream ? remoteStream.toURL() : ''}
      />
      <IconView>
        <Pressable>
          <Icon source={btnCameraReverse} />
        </Pressable>
        <Pressable>
          <Icon source={btnAudioOff} />
        </Pressable>
        <Pressable>
          <Icon source={btnVideoOn} />
        </Pressable>
      </IconView>
    </ContainerView>
  );
}

const ContainerView = styled.View`
  flex: 1;
  position: relative;
`;

const MyRTCView = styled(RTCView)`
  flex: 1;
`;

const RemoteRTCView = styled(RTCView)`
  position: absolute;
  bottom: 173px;
  right: 15px;
  width: 100px;
  height: 140px;
`;

const ExitButton = styled.Pressable`
  position: absolute;
  top: 23px;
  right: 15px;
  align-items: center;
  padding: 5px 15px;
  border-radius: 8px;
  background-color: ${({theme}) => theme.color.red200};
`;

const ButtonText = styled.Text`
  font-size: ${({theme}) => theme.fontSize.header};
  font-weight: 700;
`;

const IconView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 30px 44px 64px;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Icon = styled.Image`
  width: 57px;
  height: 57px;
`;

export default VideoChat;
