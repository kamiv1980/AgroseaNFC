import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import NfcManager, {
  Nfc15693RequestFlagIOS,
  NfcTech,
} from 'react-native-nfc-manager';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {SensorScreen, MemoryScreen, MoreScreen} from './screens';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import {calculateCRC32} from './utils/getControlSum';
import {StatisticScreen} from "./screens/StatisticScreen";

const Tab = createBottomTabNavigator();

NfcManager.start();

function App(): React.JSX.Element | null {
  const [hasNfc, setHasNFC] = useState(null);
  // const [log, setLog] = useState('Ready...');
  const [mainInfo, setMainInfo] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  const [address, setAddress] = useState(1);
  const [error, setError] = useState('');

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


  const readTag = async () => {
    try {
      // register for the NFC tag with NDEF in it
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
    } catch (ex) {
      NfcManager.setAlertMessage(`Oops! ${ex}`);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  const writeTag = async isCyclic => {
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
      NfcManager.setAlertMessage(`Oops! ${ex}`);
      setError(ex);
      // console.warn('Oops!', ex);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  if (hasNfc === null) {
    return null;
  }

  // if (!hasNfc) {
  //   return (
  //     <SafeAreaView style={styles.container}>
  //       <View style={styles.log}>
  //         <Text>NFC not supported</Text>
  //       </View>
  //     </SafeAreaView>
  //   );
  // }

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
          tabBarInactiveTintColor: '#333333',
          tabBarStyle: {backgroundColor: '#f0b400'},
          headerStyle: {
            backgroundColor: '#f0b400',
          },
        }}>
        <Tab.Screen
          name="Tag information"
          options={{
            tabBarLabel: 'Tag',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="transit-connection-variant"
                color={color}
                size={size}
              />
            ),
          }}>
          {props => (
            <SensorScreen
              {...props}
              readTag={readTag}
              mainInfo={mainInfo}
              systemInfo={systemInfo}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Sensor address"
          options={{
            tabBarLabel: 'Memory',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="memory" color={color} size={size} />
            ),
          }}>
          {props => (
            <MemoryScreen
              {...props}
              NfcManager={NfcManager}
              writeTag={writeTag}
              setAddress={setAddress}
              address={address}
              error={error}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Statistic"
          options={{
            tabBarLabel: 'Statistic',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="book-information-variant" color={color} size={size} />
            ),
          }}>
          {props => (
            <StatisticScreen
              {...props}
              // NfcManager={NfcManager}
              // writeTag={writeTag}
              // setAddress={setAddress}
              // address={address}
              // error={error}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="More"
          options={{
            headerShown: false,
            tabBarLabel: 'More',
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  log: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
