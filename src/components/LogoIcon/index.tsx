import React from 'react';
import styled from 'styled-components/native';
import {LogoProps} from '~/types/dataTypes';
import {icLogo} from '~/assets/images';

function LogoIcon({width, height}: LogoProps) {
  return <Logo source={icLogo} width={width} height={height} />;
}

const Logo = styled.Image`
  width: ${({width}) => width}px;
  height: ${({height}) => height}px;
`;

export default LogoIcon;
