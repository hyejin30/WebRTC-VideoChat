import React, {useState} from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {icEyeOff, icEyeOn} from '~/assets/images';

type Props = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChangeText: Function;
  onBlur: Function;
};

function LabelPwInput({
  label,
  name,
  placeholder,
  value,
  onChangeText,
  onBlur,
}: Props) {
  const [isPwNotShown, setIsPwNotShown] = useState(true);

  const handleShowPw = () => {
    setIsPwNotShown(!isPwNotShown);
  };

  return (
    <>
      <Label>{label}</Label>
      <PwInputWrapView>
        <Input
          placeholder={placeholder}
          value={value}
          secureTextEntry={isPwNotShown}
          onChangeText={(text: string) => onChangeText(name, text)}
          onBlur={() => onBlur(name, value)}
        />
        <ShowPwButton onPress={() => handleShowPw()}>
          <ShowPwIcon source={isPwNotShown ? icEyeOff : icEyeOn} />
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
  padding: ${Platform.OS === 'android' ? '10px' : '15px'};
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
