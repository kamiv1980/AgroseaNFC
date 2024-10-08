import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {
  MenuScreen,
  SettingsScreen,
  LanguageSelectScreen,
  TrialCodeScreen,
  AboutScreen,
  TagScreen,
  ProfileSelectScreen,
} from '../../screens';
import {useTranslation} from 'react-i18next';

const Stack = createNativeStackNavigator();

export const MoreScreen = ({navigation, hasNfc}) => {
  const {t} = useTranslation();

  useFocusEffect(
    React.useCallback(() => {
      const resetToMenu = () => {
        const state = navigation.getState();
        const currentTab = state.routes[state.index];

        if (currentTab.state) {
          const nestedState = currentTab.state;
          const nestedRoute = nestedState.routes[nestedState.index];
          if (nestedRoute.name !== 'Menu') {
            navigation.reset({
              index: 0,
              routes: [{name: 'Menu'}],
            });
          }
        }
      };

      resetToMenu();
    }, [navigation]),
  );

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f0b400',
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Menu"
        options={{
          title: t('screens.more.title'),
          headerBackTitle: t('screens.more.title'),
        }}
      >
        {props => <MenuScreen {...props} hasNfc={hasNfc} />}
      </Stack.Screen>
      <Stack.Screen
        name="Settings"
        options={{
          title: t('screens.settings.title'),
          headerBackTitle: t('screens.more.title'),
        }}
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Language"
        options={{
          title: t('screens.language.title'),
          headerBackTitle: t('screens.settings.title'),
        }}
        component={LanguageSelectScreen}
      />
      <Stack.Screen
        name="Profile"
        options={{
          title: t('screens.profile.title'),
          headerBackTitle: t('screens.settings.title'),
        }}
        component={ProfileSelectScreen}
      />
      <Stack.Screen
        name="Trial"
        options={{
          title: t('screens.trialCode.title'),
          headerBackTitle: t('screens.more.title'),
        }}
        component={TrialCodeScreen}
      />
      <Stack.Screen
        name="TagInfo"
        options={{
          title: t('screens.tag.title'),
          headerBackTitle: t('screens.more.title'),
        }}
        component={TagScreen}
      />
      <Stack.Screen
        name="About"
        options={{
          title: t('screens.about.title'),
          headerBackTitle: t('screens.more.title'),
        }}
        component={AboutScreen}
      />
    </Stack.Navigator>
  );
};
