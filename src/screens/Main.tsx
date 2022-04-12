import React from 'react';
import {SafeAreaView} from 'react-native';
import styled from 'styled-components/native';
import {StyledButton} from '~/components';
import {MainScreenProps, RootStackParamList} from '~/types/dataTypes';
import {imgMain} from '~/assets/images';

function Main({navigation}: MainScreenProps) {
  const changeScreen = (screen: keyof RootStackParamList) => {
    navigation.navigate(screen);
  };

  return (
    <StyledSafeAreaView>
      <ContainerView>
        <HeaderView>
          <SubTitleText>이제 모바일로</SubTitleText>
          <TitleText>편하게 상담받으세요.</TitleText>
          <SubText>언제 어디서든지 전문의에게 상담받으세요.</SubText>
        </HeaderView>
        <ImageView>
          <MainImage source={imgMain} resizeMode="contain" />
        </ImageView>
        <StyledButton onPress={() => changeScreen('VideoChat')}>
          화상연결
        </StyledButton>
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
  margin-top: 52px;
`;

const GrayText = styled.Text`
  color: ${({theme}) => theme.color.gray200};
`;

const SubTitleText = styled(GrayText)`
  margin-bottom: 2px;
  font-size: ${({theme}) => theme.fontSize.subTitle};
`;

const SubText = styled(GrayText)`
  font-size: ${({theme}) => theme.fontSize.body};
`;

const TitleText = styled.Text`
  margin-bottom: 12px;
  font-size: ${({theme}) => theme.fontSize.title};
  font-weight: 700;
  color: ${({theme}) => theme.color.primary};
`;

const ImageView = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 44px 62px 66.3px;
`;

const MainImage = styled.Image`
  flex: 1;
`;

export default Main;
