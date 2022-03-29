import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {SignInScreenProps} from '~/types/types';

function SignIn({navigation}: SignInScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Text>SignIn</Text>
      </View>
    </SafeAreaView>
  );
}

export default SignIn;
