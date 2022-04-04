import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components/native';

type Props = {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChangeText: Function;
  onBlur: Function;
};

function LabelInput({
  label,
  name,
  placeholder,
  value,
  onChangeText,
  onBlur,
}: Props) {
  return (
    <>
      <Label>{label}</Label>
      <Input
        placeholder={placeholder}
        value={value}
        onChangeText={(text: string) => onChangeText(name, text)}
        onBlur={() => onBlur(name, value)}
      />
    </>
  );
}

const Label = styled.Text`
  margin-bottom: 7px;
  font-size: ${({theme}) => theme.fontSize.body};
  font-weight: 700;
`;

const Input = styled.TextInput`
  padding: ${Platform.OS === 'android' ? '10px' : '15px'};
  border: 1px solid ${({theme}) => theme.color.gray100};
  border-radius: 8px;
  font-size: ${({theme}) => theme.fontSize.body};
`;

export default LabelInput;
