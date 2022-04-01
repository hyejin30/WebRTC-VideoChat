import React, {useState} from 'react';
import styled from 'styled-components/native';
import {icEyeOff, icEyeOn} from '~/assets/images';
import {IsPwNotShownProps} from 'types/types';

type Props = {
  label: string;
  info: string;
  placeholder: string;
  value: string;
  onChangeText: Function;
  onBlur: Function;
};

function LabelPwInput({
  label,
  info,
  placeholder,
  value,
  onChangeText,
  onBlur,
}: Props) {
  const initialValue: IsPwNotShownProps = {
    password: true,
    passwordVerify: true,
  };

  const [isPwNotShown, setIsPwNotShown] = useState(initialValue);

  const handleShowPw = (name: string, valid: boolean) => {
    setIsPwNotShown(prev => ({...prev, [name]: !valid}));
  };

  return (
    <>
      <Label>{label}</Label>
      <PwInputWrapView>
        <Input
          placeholder={placeholder}
          value={value}
          secureTextEntry={isPwNotShown[info]}
          onChangeText={(text: string) => onChangeText(info, text)}
          onBlur={() => onBlur(info, value)}
        />
        <ShowPwButton onPress={() => handleShowPw(info, isPwNotShown[info])}>
          <ShowPwIcon source={isPwNotShown[info] ? icEyeOff : icEyeOn} />
        </ShowPwButton>
      </PwInputWrapView>
    </>
  );
}

const Label = styled.Text`
  margin-bottom: 7px;
  font-size: ${({theme}) => theme.fontSize.body};
  font-weight: 700;
`;

const PwInputWrapView = styled.View`
  flex-direction: row;
  align-items: center;
  position: relative;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 15px;
  border: 1px solid ${({theme}) => theme.color.gray100};
  border-radius: 8px;
  font-size: ${({theme}) => theme.fontSize.body};
`;

const ShowPwButton = styled.Pressable`
  position: absolute;
  right: 15.3px;
`;

const ShowPwIcon = styled.Image`
  width: 19px;
  height: 14.7px;
`;

export default LabelPwInput;
