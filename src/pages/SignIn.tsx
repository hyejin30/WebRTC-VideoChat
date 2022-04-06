import React, {useCallback, useMemo} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {
  GoBackButton,
  LabelInput,
  LabelPwInput,
  StyledButton,
  LogoIcon,
  WarningText,
} from '~/components';
import useSignIn from '~/hooks/useSignIn';
import {SignInScreenProps} from '~/types/dataTypes';

function SignIn({navigation}: SignInScreenProps) {
  const changePage = useCallback(
    page => {
      navigation.navigate(page);
    },
    [navigation],
  );

  const {signInValue, warnings, handleButtonValid, updateSignInValue, signIn} =
    useSignIn(changePage);

  const {email, password} = signInValue;
  const {emailWarning, pwWarning} = warnings;

  const isButtonValid: boolean = useMemo(
    () => handleButtonValid(),
    [handleButtonValid],
  );

  return (
    <StyledSafeAreaView>
      <ContainerView>
        <HeaderView>
          <GoBackButton />
        </HeaderView>
        <LogoView>
          <LogoIcon width={156.8} height={60} />
        </LogoView>
        <FormView>
          <View>
            <InputView>
              <LabelInput
                label="이메일"
                name="email"
                value={email}
                placeholder="이메일을 입력해주세요"
                onChangeText={updateSignInValue}
                onBlur={() => {}}
              />
              {!!emailWarning && (
                <WarningText>{emailWarning ?? ''}</WarningText>
              )}
            </InputView>
            <InputView>
              <LabelPwInput
                label="비밀번호"
                name="password"
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChangeText={updateSignInValue}
                onBlur={() => {}}
              />
              {!!pwWarning && <WarningText>{pwWarning ?? ''}</WarningText>}
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
