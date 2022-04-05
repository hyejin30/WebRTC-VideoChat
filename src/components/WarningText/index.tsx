import React, {FC} from 'react';
import styled from 'styled-components/native';

const WarningText: FC = ({children}) => {
  return <StyledText>{children}</StyledText>;
};

const StyledText = styled.Text`
  margin-top: 7px;
  margin-left: 15px;
  font-size: ${({theme}) => theme.fontSize.body};
  font-weight: 700;
  color: ${({theme}) => theme.color.red100};
`;

export default WarningText;
