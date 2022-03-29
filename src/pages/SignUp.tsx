import React, {useCallback} from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {SignUpScreenProps} from '~/types/types';

function SignUp({navigation}: SignUpScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Text>SignUp</Text>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;
