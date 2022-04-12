import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {LogoIcon, StyledButton} from '~/components';
import {EntryScreenProps, RootStackParamList} from '~/types/dataTypes';

function Entry({navigation}: EntryScreenProps) {
  const changeScreen = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <StyledSafeAreaView>
      <ContainerView>
        <LogoView>
          <LogoIcon width={156.8} height={60} />
        </LogoView>
        <View>
          <StyledButton onPress={() => changeScreen('SignIn')}>
            로그인
          </StyledButton>
          <SignUpButton onPress={() => changeScreen('SignUp')}>
            <ButtonText>회원가입</ButtonText>
          </SignUpButton>
        </View>
      </ContainerView>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${({theme}) => theme.color.white};
`;

const ContainerView = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: 33px;
  background-color: ${({theme}) => theme.color.white};
`;

const LogoView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const SignUpButton = styled.Pressable`
  align-items: center;
  margin-top: 15px;
  padding-top: 17px;
  padding-bottom: 16px;
  background-color: ${({theme}) => theme.color.white};
  border: 1px solid ${({theme}) => theme.color.primary};
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  font-size: ${({theme}) => theme.fontSize.header};
  font-weight: 700;
  color: ${({theme}) => theme.color.primary};
`;

export default Entry;
