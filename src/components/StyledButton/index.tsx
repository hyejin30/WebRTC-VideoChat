import React, {FC} from 'react';
import styled from 'styled-components/native';

type ButtonProps = {
  disabled?: boolean;
  onPress: Function;
};

const StyledButton: FC<ButtonProps> = ({children, disabled, onPress}) => {
  return (
    <Button disabled={disabled} onPress={() => onPress()}>
      <ButtonText>{children}</ButtonText>
    </Button>
  );
};

const Button = styled.Pressable`
  align-items: center;
  padding-top: 17px;
  padding-bottom: 16px;
  background-color: ${({disabled}) =>
    disabled
      ? ({theme}) => theme.color.gray100
      : ({theme}) => theme.color.primary};
  border-radius: 8px;
`;

const ButtonText = styled.Text`
  font-size: ${({theme}) => theme.fontSize.header};
  font-weight: 700;
  color: ${({theme}) => theme.color.white};
`;

export default StyledButton;
