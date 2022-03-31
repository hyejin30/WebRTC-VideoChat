import React, {useState, useCallback} from 'react';
import {Alert, View} from 'react-native';
import styled from 'styled-components/native';
import {LabelInput} from '../components/LabelInput';
import {LabelPwInput} from '../components/LabelPwInput';
import {StyledButton} from '../components/StyledButton';
import {SignUpScreenProps} from 'types/types';
import {postSignUpInfo} from '../hooks/hooks';
import Images from '../assets/images/index';
import {SafeAreaView} from 'react-native-safe-area-context';

function SignUp({navigation}: SignUpScreenProps) {
  const [signUpInfo, setSignUpInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordVerify: '',
  });

  const changePage = useCallback(
    (page: string) => {
      navigation.navigate(page);
    },
    [navigation],
  );

  const updateSignUpInfo = (info: string, value: string) => {
    setSignUpInfo(prev => ({...prev, [info]: value}));
  };

  const signUp = async () => {
    try {
      const result = await postSignUpInfo(signUpInfo);
      // FIXME : 가입 완료 후 로직 수정 예정
      if (result) {
        Alert.alert('가입이 완료되었습니다');
        changePage('Main');
      }
    } catch (error) {
      // FIXME : postSignUpInfo, signUp 에러 처리 차이점?
      if (error instanceof Error) {
        Alert.alert(error.message);
      } else {
        Alert.alert(String(error));
      }
    }
  };

  const {firstName, lastName, email, password, passwordVerify} = signUpInfo;

  const isButtonValid: boolean = Boolean(
    firstName &&
      lastName &&
      email &&
      password &&
      passwordVerify &&
      password === passwordVerify,
  );

  return (
    <StyledSafeAreaView>
      <ContainerView>
        <HeaderView>
          <GoBackButton onPress={() => changePage('Entry')}>
            <GoBackIcon source={Images.backArrowIcon} />
          </GoBackButton>
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
                />
              </FirstNameView>
              <LastNameView>
                <LabelInput
                  label="이름"
                  info="lastName"
                  value={lastName}
                  placeholder="이름을 입력해주세요"
                  onChangeText={updateSignUpInfo}
                />
              </LastNameView>
            </RowInputView>
            <InputView>
              <LabelInput
                label="이메일"
                info="email"
                value={email}
                placeholder="이메일을 입력해주세요"
                onChangeText={updateSignUpInfo}
              />
            </InputView>
            <InputView>
              <LabelPwInput
                label="비밀번호"
                info="password"
                value={password}
                placeholder="비밀번호를 입력해주세요"
                onChangeText={updateSignUpInfo}
              />
            </InputView>
            <InputView>
              <LabelPwInput
                label="비밀번호 확인"
                info="passwordVerify"
                value={passwordVerify}
                placeholder="비밀번호를 다시 입력해주세요"
                onChangeText={updateSignUpInfo}
              />
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

const GoBackButton = styled.Pressable`
  position: absolute;
  left: 0;
`;

const GoBackIcon = styled.Image`
  width: ${({theme}) => theme.fontSize.header};
  height: ${({theme}) => theme.fontSize.header};
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
