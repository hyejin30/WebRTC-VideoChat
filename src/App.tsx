import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ThemeProvider} from 'styled-components/native';
import Entry from '@pages/Entry';
import SignUp from '@pages/SignUp';
import SignIn from '@pages/SignIn';
import Main from '@pages/Main';
import VideoChat from '@pages/VideoChat';
import theme from '~/styles/theme';

const Stack = createNativeStackNavigator();
function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={theme}>
        <Stack.Navigator
          initialRouteName="SignIn"
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
