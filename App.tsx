import React, {useEffect, useState} from 'react';
import './src/localization/i18n';
import NfcManager from 'react-native-nfc-manager';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  SensorScreen,
  MoreScreen,
  StatisticScreen,
  ErrorScreen,
} from './src/screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {useTranslation} from 'react-i18next';
import {ProfileContextProvider} from "./src/context/ProfileContextMangement";

const Tab = createBottomTabNavigator();

NfcManager.start();

function App(): React.JSX.Element | null {
  const [hasNfc, setHasNFC] = useState(null);

  const {t, i18n} = useTranslation();

  useEffect(() => {
    if (!i18n.isInitialized) {
      return; // Avoid rendering until i18n is initialized
    }
  }, [i18n.isInitialized]);

  useEffect(() => {
    const checkIsSupported = async () => {
      const deviceIsSupported = await NfcManager.isSupported();
      setHasNFC(deviceIsSupported);
      if (deviceIsSupported) {
        await NfcManager.start();
      }
    };

    checkIsSupported();
  }, []);

  return (
    <ProfileContextProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#e91e63',
            tabBarInactiveTintColor: '#333333',
            tabBarStyle: {backgroundColor: '#f0b400'},
            headerStyle: {backgroundColor: '#f0b400'},
            headerTitleAlign: 'center',
          }}>
          <Tab.Screen
            name={t('screens.sensor.title')}
            options={{
              tabBarLabel: t('screens.sensor.tabLabel'),
              tabBarIcon: ({color, size}) => (
                <MaterialIcons name="sensors" color={color} size={size} />
              ),
            }}>
            {props =>
              hasNfc ? (
                <SensorScreen {...props} />
              ) : (
                <ErrorScreen
                  {...props}
                  text={t('screens.error.nfcNotSupported')}
                />
              )
            }
          </Tab.Screen>
          <Tab.Screen
            name={t('screens.statistic.title')}
            options={{
              tabBarLabel: t('screens.statistic.tabLabel'),
              tabBarIcon: ({color, size}) => (
                <MaterialCommunityIcons
                  name="book-information-variant"
                  color={color}
                  size={size}
                />
              ),
            }}>
            {props =>
              hasNfc ? (
                <StatisticScreen {...props} />
              ) : (
                <ErrorScreen
                  {...props}
                  text={t('screens.error.nfcNotSupported')}
                />
              )
            }
          </Tab.Screen>
          <Tab.Screen
            name="More"
            options={{
              headerShown: false,
              tabBarLabel: t('screens.more.tabLabel'),
              tabBarIcon: ({color, size}) => (
                <Feather name="more-horizontal" color={color} size={size} />
              ),
            }}>
            {props => <MoreScreen {...props} hasNfc={hasNfc} />}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ProfileContextProvider>
  );
}

export default App;
