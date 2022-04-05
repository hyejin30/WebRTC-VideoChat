import React from 'react';
import styled from 'styled-components/native';
import {useNavigation} from '@react-navigation/native';
import {icBackArrow} from '~/assets/images';

function GoBackButton() {
  const navigation = useNavigation();

  return (
    <Button
      onPress={() => {
        navigation.goBack();
      }}>
      <GoBackIcon source={icBackArrow} />
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

export default GoBackButton;
