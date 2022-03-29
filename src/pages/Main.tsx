import React from 'react';
import {SafeAreaView, Text, View} from 'react-native';
import {MainScreenProps} from 'types/types';

function Main({navigation}: MainScreenProps) {
  return (
    <SafeAreaView>
      <View>
        <Text>Main</Text>
      </View>
    </SafeAreaView>
  );
}

export default Main;
