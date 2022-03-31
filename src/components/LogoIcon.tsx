import React from 'react';
import styled from 'styled-components/native';
import Images from '../assets/images/index';
import {LogoProps} from 'types/types';

export function LogoIcon({width, height}: LogoProps) {
  return <Logo source={Images.logo} width={width} height={height} />;
}

const Logo = styled.Image`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;
