import React, {useEffect, useState} from 'react';
import './src/localization/i18n';
import {Platform} from 'react-native';
import NfcManager, {
  Nfc15693RequestFlagIOS,
  NfcTech,
} from 'react-native-nfc-manager';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {
  TagScreen,
  SensorScreen,
  MoreScreen,
  StatisticScreen,
  ErrorScreen
} from './src/screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import {calculateCRC32} from './src/utils/getControlSum';
import {useTranslation} from 'react-i18next';

const Tab = createBottomTabNavigator();

NfcManager.start();

function App(): React.JSX.Element | null {
  const [hasNfc, setHasNFC] = useState(null);
  const [mainInfo, setMainInfo] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  const [address, setAddress] = useState(1);
  const [error, setError] = useState('');

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

  const readTag = () => {
    Platform.OS === 'ios' ? readTagIOS() : readTagAndroid();
  };

  const readTagIOS = async () => {
    try {
      // register for the NFC tag with Iso15693IOS in it
      await NfcManager.requestTechnology(NfcTech.Iso15693IOS);
      // the resolved tag object will contain `ndefMessage` property
      const tag = await NfcManager.getTag();
      setMainInfo(tag);

      const handler = NfcManager.iso15693HandlerIOS;

      const resp = (await handler.getSystemInfo(
        Nfc15693RequestFlagIOS.HighDataRate,
      )) as any;
      setSystemInfo(resp);

      const blockBytes = await handler.readSingleBlock({
        flags: Nfc15693RequestFlagIOS.HighDataRate,
        blockNumber: 5,
      });
      Array.isArray(blockBytes) && setAddress(blockBytes[0]);
      await NfcManager.setAlertMessage('Tag found');
    } catch (ex) {
      await NfcManager.setAlertMessage(`Oops! ${ex}`);
      setMainInfo(null);
      setSystemInfo(null);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  const readTagAndroid = async () => {
    try {

      await NfcManager.requestTechnology(NfcTech.NfcV);
      let tag = await NfcManager.getTag();
      setMainInfo(tag);
      console.log(tag);

      const idBytes = tag.id.split(/(..)/g).filter(s => s);
      idBytes.forEach((val, i, a) => a[i] = parseInt(val, 16));

      let res = await NfcManager.transceive([32,32,...idBytes,0]);
      console.log(res);

      const resp1 = await NfcManager.transceive([0x20,0x20,0,0,0,0,0,0,0,0,0]);
      console.log(resp1);

    } catch (ex) {
      await NfcManager.setAlertMessage(`Oops! ${ex}`);
      setMainInfo(null);
      setSystemInfo(null);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  const writeTagIOS = async isCyclic => {
    setError('');

    try {
      await NfcManager.requestTechnology(NfcTech.Iso15693IOS, {
        alertMessage: 'Ready to numbering!',
      });

      const tag = await NfcManager.getTag();
      setMainInfo(tag);

      const handler = NfcManager.iso15693HandlerIOS;

      const resp = (await handler.getSystemInfo(
        Nfc15693RequestFlagIOS.HighDataRate,
      )) as any;
      setSystemInfo(resp);

      const blockBytes = await handler.readSingleBlock({
        flags: Nfc15693RequestFlagIOS.HighDataRate,
        blockNumber: 5,
      });

      if (Array.isArray(blockBytes)) {
        const newBlock = blockBytes.map((el, idx) =>
          idx === 0 ? address : el,
        );
        await handler.writeSingleBlock({
          flags: Nfc15693RequestFlagIOS.HighDataRate,
          blockNumber: 5,
          dataBlock: newBlock,
        });

        const blockBytesForCRC = await handler.readMultipleBlocks({
          flags: Nfc15693RequestFlagIOS.HighDataRate,
          blockNumber: 0,
          blockCount: 7,
        });

        await handler.writeSingleBlock({
          flags: Nfc15693RequestFlagIOS.HighDataRate,
          blockNumber: 7,
          dataBlock: calculateCRC32(blockBytesForCRC.flat()),
        });
      }
      await NfcManager.setAlertMessage('Success');
      !!isCyclic && setAddress(prev => ++prev);
    } catch (ex) {
      await NfcManager.setAlertMessage(`Oops! ${ex}`);
      setError(ex);
      setMainInfo(null);
      setSystemInfo(null);
      // console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
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
          {props => (
            hasNfc ?
            <SensorScreen
              {...props}
              NfcManager={NfcManager}
              writeTag={writeTagIOS}
              setAddress={address => {
                setError('');
                setAddress(address);
              }}
              address={address}
              error={error}
            /> : <ErrorScreen {...props} text={t('screens.error.nfcNotSupported')}/>
          )}
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
          {props => hasNfc ? <StatisticScreen {...props} />
              : <ErrorScreen {...props} text={t('screens.error.nfcNotSupported')}/>}
        </Tab.Screen>
        <Tab.Screen
          name={t('screens.tag.title')}
          options={{
            tabBarLabel: t('screens.tag.tabLabel'),
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="memory" color={color} size={size} />
            ),
          }}>
          {props => (
            hasNfc ?
            <TagScreen
              {...props}
              readTag={readTag}
              mainInfo={mainInfo}
              systemInfo={systemInfo}
            /> : <ErrorScreen {...props} text={t('screens.error.nfcNotSupported')}/>
          )}
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
          {props => <MoreScreen {...props} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;
