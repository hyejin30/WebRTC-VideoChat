import React from 'react';
import {Animated, Pressable} from 'react-native';
import {RTCView} from 'react-native-webrtc';
import styled from 'styled-components/native';
import {RootStackParamList, VideoChatScreenProps} from '~/types/dataTypes';
import {useDrag, useMySocket} from '~/hooks';
import {
  btnCameraReverse,
  btnAudioOff,
  btnAudioOn,
  btnVideoOn,
  btnVideoOff,
  icVideoOffHuman,
  icAudioOff,
} from '~/assets/images';

function VideoChat({navigation}: VideoChatScreenProps) {
  const {
    localStream,
    remoteStream,
    isVideoFront,
    isVideo,
    isAudio,
    setIsVideoFront,
    setIsVideo,
    setIsAudio,
  } = useMySocket();

  const {panResponder, style} = useDrag();

  const changeScreen = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <ContainerView>
      <RemoteRTCView
        objectFit="cover"
        streamURL={remoteStream ? remoteStream.toURL() : ''}
      />
      <ExitButton onPress={() => changeScreen('Entry')}>
        <ButtonText>나가기</ButtonText>
      </ExitButton>
      <RemoteNameView>
        <RemoteNameText>
          {remoteStream ? '김퍼즐' : '연결 대기중'}
        </RemoteNameText>
      </RemoteNameView>
      <LocalView style={style} {...panResponder.panHandlers}>
        <LocalRTCView
          objectFit="cover"
          streamURL={localStream ? localStream.toURL() : ''}
        />
        {!isVideo && (
          <LocalVideoIcon source={icVideoOffHuman} resizeMode="contain" />
        )}
        <LocalNameView>
          <UserNameText>김아이</UserNameText>
          {!isAudio && (
            <LocalAudioIcon source={icAudioOff} resizeMode="contain" />
          )}
        </LocalNameView>
      </LocalView>
      <IconView>
        <Pressable
          onPress={() => {
            setIsVideoFront(!isVideoFront);
          }}>
          <Icon source={btnCameraReverse} />
        </Pressable>
        <Pressable
          onPress={() => {
            setIsAudio(!isAudio);
          }}>
          <Icon source={isAudio ? btnAudioOn : btnAudioOff} />
        </Pressable>
        <Pressable
          onPress={() => {
            setIsVideo(!isVideo);
          }}>
          <Icon source={isVideo ? btnVideoOn : btnVideoOff} />
        </Pressable>
      </IconView>
    </ContainerView>
  );
}

const ContainerView = styled.View`
  flex: 1;
  position: relative;
`;

const RemoteRTCView = styled(RTCView)`
  flex: 1;
`;

const LocalView = styled(Animated.View)`
  align-items: center;
  position: absolute;
  bottom: 173px;
  right: 15px;
  width: 100px;
  height: 140px;
`;

const LocalRTCView = styled(RTCView)`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const UserNameText = styled.Text`
  padding: 3.25px 0 2px;
  text-align: center;
  font-size: ${({theme}) => theme.fontSize.header};
  color: ${({theme}) => theme.color.white};
  background-color: ${({theme}) => theme.color.black};
  opacity: 0.8;
`;

const RemoteNameView = styled.View`
  align-items: center;
`;

const RemoteNameText = styled(UserNameText)`
  position: absolute;
  bottom: 173px;
  padding: 3.25px 15px 2px;
  border-radius: 5px;
`;

const LocalNameView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: ${({theme}) => theme.color.black};
`;

const LocalAudioIcon = styled.Image`
  width: 15px;
  height: 18px;
  margin-left: 5px;
`;

const LocalVideoIcon = styled.Image`
  width: 100%;
  height: 100%;
  background-color: ${({theme}) => theme.color.gray200};
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
