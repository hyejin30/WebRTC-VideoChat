import React from 'react';
import styled from 'styled-components/native';
import Images from '../assets/images/index';
import {GoBackProps} from 'types/types';

export function GoBackButton({page, onPress}: GoBackProps) {
  return (
    <Button onPress={() => onPress(page)}>
      <GoBackIcon source={Images.backArrowIcon} />
    </Button>
  );
}

const Button = styled.Pressable`
  position: absolute;
  left: 0;
`;

const GoBackIcon = styled.Image`
  width: ${({theme}) => theme.fontSize.header};
  height: ${({theme}) => theme.fontSize.header};
`;
