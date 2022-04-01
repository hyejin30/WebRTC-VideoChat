import React, {useCallback} from 'react';
import {View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import styled from 'styled-components/native';
import {
  GoBackButton,
  LabelInput,
  LabelPwInput,
  StyledButton,
  WarningText,
} from '~/components';
import {SignUpScreenProps} from 'types/types';
import {useSignUp} from '~/hooks';

function SignUp({navigation}: SignUpScreenProps) {
  const changePage = useCallback(
    (page: string) => {
      navigation.navigate(page);
    },
    [navigation],
  );

  const {
    signUpInfo,
    warningValid,
    warningText,
    updateSignUpInfo,
    checkSignUpInfo,
    signUp,
  } = useSignUp(changePage);

  const {firstName, lastName, email, password, passwordVerify} = signUpInfo;

  const {
    isFirstNameWarning,
    isLastNameWarning,
    isEmailWarning,
    isPwWarning,
    isPwVerifyWarning,
  } = warningValid;

  const {
    firstNameWarningText,
    lastNameWarningText,
    emailWarningText,
    pwWarningText,
    pwVerifyWarningText,
  } = warningText;

  const isButtonValid: boolean =
    Boolean(
      firstName &&
        lastName &&
        email &&
        password &&
        passwordVerify &&
        password === passwordVerify,
    ) &&
    !isFirstNameWarning &&
    !isLastNameWarning &&
    !isEmailWarning &&
    !isPwWarning &&
    !isPwVerifyWarning;

  return (
    <StyledSafeAreaView>
      <ContainerView>
        <HeaderView>
          <GoBackButton page="Entry" onPress={changePage} />
          <HeaderText>회원가입</HeaderText>
        </HeaderView>
        <FormView>
          <View>
            <RowInputView>
              <FirstNameView>
                <LabelInput
                  label="성"
                  info="firstName"
                  value={firstName}
                  placeholder="성을 입력해주세요"
                  onChangeText={updateSignUpInfo}
                  onBlur={checkSignUpInfo}
                />
                {isFirstNameWarning && (
                  <WarningText>{firstNameWarningText}</WarningText>
                )}
              </FirstNameView>
              <LastNameView>
                <LabelInput
                  label="이름"
                  info="lastName"
                  value={lastName}
                  placeholder="이름을 입력해주세요"
                  onChangeText={updateSignUpInfo}
                  onBlur={checkSignUpInfo}
                />
                {isLastNameWarning && (
                  <WarningText>{lastNameWarningText}</WarningText>
                )}
              </LastNameView>
            </RowInputView>
            <InputView>
              <LabelInput
                label="이메일"
                info="email"
                value={email}
                placeholder="이메일을 입력해주세요"
                onChangeText={updateSignUpInfo}
                onBlur={checkSignUpInfo}
              />
              {isEmailWarning && <WarningText>{emailWarningText}</WarningText>}
            </InputView>
            <InputView>
              <LabelPwInput
                label="비밀번호"
                info="password"
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChangeText={updateSignUpInfo}
                onBlur={checkSignUpInfo}
              />
              {isPwWarning && <WarningText>{pwWarningText}</WarningText>}
            </InputView>
            <InputView>
              <LabelPwInput
                label="비밀번호 확인"
                info="passwordVerify"
                value={passwordVerify}
                placeholder="비밀번호를 다시 입력해주세요"
                onChangeText={updateSignUpInfo}
                onBlur={checkSignUpInfo}
              />
              {isPwVerifyWarning && (
                <WarningText>{pwVerifyWarningText}</WarningText>
              )}
            </InputView>
          </View>
          <StyledButton disabled={!isButtonValid} onPress={signUp}>
            가입완료
          </StyledButton>
        </FormView>
      </ContainerView>
    </StyledSafeAreaView>
  );
}

const StyledSafeAreaView = styled(SafeAreaView)`
  flex: 1;
`;

const ContainerView = styled.View`
  justify-content: space-between;
  flex: 1;
  padding: 33px;
`;

const HeaderView = styled.View`
  flex-direction: row;
  justify-content: center;
  position: relative;
`;

const HeaderText = styled.Text`
  font-size: ${({theme}) => theme.fontSize.header};
  font-weight: 700;
`;

const FormView = styled.View`
  justify-content: space-between;
  flex: 1;
`;

const InputView = styled.View`
  margin: 15px 0;
`;

const RowInputView = styled(InputView)`
  flex-direction: row;
  margin-top: 40px;
`;

const FirstNameView = styled.View`
  flex: 1;
  margin-right: 5px;
`;

const LastNameView = styled.View`
  flex: 1;
  margin-left: 5px;
`;

export default SignUp;
