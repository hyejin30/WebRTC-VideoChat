import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components/native';
import Entry from '~/screens/Entry';
import SignUp from '~/screens/SignUp';
import SignIn from '~/screens/SignIn';
import Main from '~/screens/Main';
import VideoChat from '~/screens/VideoChat';
import theme from '~/styles/theme';
import {RootStackParamList} from './types/dataTypes';

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Stack.Navigator
          initialRouteName="VideoChat"
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="Entry" component={Entry} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Main" component={Main} />
          <Stack.Screen name="VideoChat" component={VideoChat} />
        </Stack.Navigator>
      </ThemeProvider>
    </NavigationContainer>
  );
}

export default App;
