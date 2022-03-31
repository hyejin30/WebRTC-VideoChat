import React, {useCallback, useState} from 'react';
import {Alert, View} from 'react-native';
import styled from 'styled-components/native';
import {StyledButton} from '../components/StyledButton';
import {LabelInput} from '../components/LabelInput';
import {LabelPwInput} from '../components/LabelPwInput';
import {GoBackButton} from '../components/GoBackButton';
import {LogoIcon} from '../components/LogoIcon';
import {SignInScreenProps} from 'types/types';
import {postSignInValue} from '../hooks/hooks';

function SignIn({navigation}: SignInScreenProps) {
  const [signInValue, setSignInValue] = useState({
    email: '',
    password: '',
  });

  const changePage = useCallback(
    (page: string) => {
      navigation.navigate(page);
    },
    [navigation],
  );

  const updateSignInValue = (name: string, value: string) => {
    setSignInValue(prev => ({...prev, [name]: value}));
  };

  const signIn = async () => {
    try {
      const result = await postSignInValue(signInValue);
      const {token} = result;
      // FIXME : else문 작성 예정
      if (token) {
        Alert.alert('로그인 성공');
        changePage('Main');
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert(String(error));
      }
    }
  };

  const {email, password} = signInValue;
  const isButtonValid: boolean = Boolean(email && password);

  return (
    <StyledSafeAreaView>
      <ContainerView>
        <HeaderView>
          <GoBackButton page="Entry" onPress={changePage} />
        </HeaderView>
        <LogoView>
          <LogoIcon width={156.8} height={60} />
        </LogoView>
        <FormView>
          <View>
            <InputView>
              <LabelInput
                label="이메일"
                info="email"
                value={email}
                placeholder="이메일을 입력해주세요"
                onChangeText={updateSignInValue}
              />
            </InputView>
            <InputView>
              <LabelPwInput
                label="비밀번호"
                info="password"
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChangeText={updateSignInValue}
              />
            </InputView>
          </View>
          <StyledButton disabled={!isButtonValid} onPress={signIn}>
            로그인
          </StyledButton>
        </FormView>
      </ContainerView>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled.SafeAreaView`
  flex: 1;
`;

const ContainerView = styled.View`
  justify-content: space-between;
  flex: 1;
  padding: 33px;
`;

const HeaderView = styled.View`
  margin-bottom: 50px;
`;

const LogoView = styled.View`
  align-items: center;
  margin-bottom: 104px;
`;

const FormView = styled.View`
  justify-content: space-between;
  flex: 1;
`;

const InputView = styled.View`
  margin: 15px 0;
`;

export default SignIn;
