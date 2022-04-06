import React, {useMemo} from 'react';
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
import {SignUpScreenProps} from '~/types/dataTypes';
import {useSignUp} from '~/hooks';

function SignUp({navigation}: SignUpScreenProps) {
  const changePage = (page: string) => {
    navigation.navigate(page);
  };

  const {
    signUpInfo,
    warnings,
    handleButtonValid,
    updateSignUpInfo,
    checkSignUpInfo,
    signUp,
  } = useSignUp(changePage);

  const {firstName, lastName, email, password, passwordVerify} = signUpInfo;

  const {
    firstNameWarning,
    lastNameWarning,
    emailWarning,
    pwWarning,
    pwVerifyWarning,
  } = warnings;

  const isButtonValid: boolean = useMemo(
    () => handleButtonValid(),
    [handleButtonValid],
  );

  return (
    <StyledSafeAreaView>
      <ContainerView>
        <HeaderView>
          <GoBackButton />
          <HeaderText>회원가입</HeaderText>
        </HeaderView>
        <FormView>
          <View>
            <RowInputView>
              <NameView>
                <LabelInput
                  label="성"
                  name="firstName"
                  value={firstName}
                  placeholder="성을 입력해주세요"
                  onChangeText={updateSignUpInfo}
                  onBlur={checkSignUpInfo}
                />
                {!!firstNameWarning && (
                  <WarningText>{firstNameWarning}</WarningText>
                )}
              </NameView>
              <NameView>
                <LabelInput
                  label="이름"
                  name="lastName"
                  value={lastName}
                  placeholder="이름을 입력해주세요"
                  onChangeText={updateSignUpInfo}
                  onBlur={checkSignUpInfo}
                />
                {!!lastNameWarning && (
                  <WarningText>{lastNameWarning ?? ''}</WarningText>
                )}
              </NameView>
            </RowInputView>
            <InputView>
              <LabelInput
                label="이메일"
                name="email"
                value={email}
                placeholder="이메일을 입력해주세요"
                onChangeText={updateSignUpInfo}
                onBlur={checkSignUpInfo}
              />
              {!!emailWarning && <WarningText>{emailWarning}</WarningText>}
            </InputView>
            <InputView>
              <LabelPwInput
                label="비밀번호"
                name="password"
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChangeText={updateSignUpInfo}
                onBlur={checkSignUpInfo}
              />
              {!!pwWarning && <WarningText>{pwWarning}</WarningText>}
            </InputView>
            <InputView>
              <LabelPwInput
                label="비밀번호 확인"
                name="passwordVerify"
                value={passwordVerify}
                placeholder="비밀번호를 다시 입력해주세요"
                onChangeText={updateSignUpInfo}
                onBlur={checkSignUpInfo}
              />
              {!!pwVerifyWarning && (
                <WarningText>{pwVerifyWarning}</WarningText>
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

const NameView = styled.View`
  flex: 1;
  margin-right: 5px;
`;

export default SignUp;
