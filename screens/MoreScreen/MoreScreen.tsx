import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';
import React from 'react';
import {
  MenuScreen,
  SettingsScreen,
  LanguageSelectScreen,
  TrialCodeScreen,
} from '../../screens';

const Stack = createNativeStackNavigator();

export const MoreScreen = ({ navigation }) => {
  useFocusEffect(
    React.useCallback(() => {
      navigation.reset({
        index: 0,
        routes: [{name: 'Menu'}],
      });
    }, [navigation]),
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f0b400',
        },
      }}>
      <Stack.Screen name="Menu" component={MenuScreen} />
      <Stack.Screen
        name="Settings"
        option={{title: 'Settings'}}
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Language"
        option={{title: 'Select Language'}}
        component={LanguageSelectScreen}
      />
      <Stack.Screen
        name="Trial"
        option={{title: 'Reset Code'}}
        component={TrialCodeScreen}
      />
    </Stack.Navigator>
  );
};
