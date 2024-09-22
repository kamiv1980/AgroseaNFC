import {
  Alert,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import React, {useState} from 'react';
import NfcManager, {NfcTech, Nfc15693RequestFlagIOS} from 'react-native-nfc-manager';

import {ModalView} from '../../components';

const manufCode = {
  2: 'STMicroelectronics',
};

export const TagScreen = () => {
  const [mainInfo, setMainInfo] = useState(null);
  const [systemInfo, setSystemInfo] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');
  const {t} = useTranslation();

  const readTag = () => {
    setError('');
    setMainInfo(null);
    setSystemInfo(null);

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
      await NfcManager.setAlertMessage('Tag found');
    } catch (ex) {
      await NfcManager.setAlertMessage(`Oops! ${ex.toString()}`);
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  const readTagAndroid = async ({NfcManager}) => {
    setModalVisible(true);

    try {
      await NfcManager.requestTechnology(NfcTech.NfcV);

      let tag = await NfcManager.getTag();
      setMainInfo(tag);
    } catch (ex) {
      Alert.alert(`Oops! ${ex.toString()}`);
    } finally {
      // stop the nfc scanning
      onCancel()
    }
  };

  const onCancel = () => {
    NfcManager.cancelTechnologyRequest();
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalView
        text={t('screens.tag.ready')}
        visible={modalVisible}
        handleCancel={onCancel}
      />

      {!mainInfo && !systemInfo && (
        <View style={styles.log}>
          <Text style={styles.title}>{t('screens.tag.instructionTitle')}</Text>
          <Text style={styles.instruction}>
            {t('screens.tag.instruction_1')}
          </Text>
          <Text style={styles.instruction}>
            {t('screens.tag.instruction_2')}
          </Text>
          <Text style={styles.instruction}>
            {t('screens.tag.instruction_3')}
          </Text>
          <Text style={styles.instruction}>
            {t('screens.tag.instruction_4')}
          </Text>
        </View>
      )}

      {mainInfo && (
        <View style={styles.log}>
          <Text style={styles.title}>{t('screens.tag.title')}</Text>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.manufCode')}</Text>
            <Text style={styles.text}>
              {manufCode[mainInfo?.icManufacturerCode] || 'unknown'}
            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.serialNumber')}</Text>
            <Text style={styles.text}>{mainInfo?.icSerialNumber}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.uid')}</Text>
            <Text style={styles.text}>{mainInfo?.id}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.compatibilityProtocol')}</Text>
            <Text style={styles.text}>{mainInfo?.tech}</Text>
          </View>
        </View>
      )}

      {systemInfo && (
        <View style={styles.log}>
          <Text style={styles.title}>{t('screens.tag.systemInfo')}</Text>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.dfsid')}</Text>
            <Text style={styles.text}>{systemInfo?.dsfid}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.afi')}</Text>
            <Text style={styles.text}>{systemInfo?.afi}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.blockSize')}</Text>
            <Text style={styles.text}>{systemInfo?.blockSize}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.memorySizeBlocks')}</Text>
            <Text style={styles.text}>{systemInfo?.blockCount}</Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.memorySizeBytes')}</Text>
            <Text style={styles.text}>
              {systemInfo?.blockCount * systemInfo?.blockSize}
            </Text>
          </View>
          <View style={styles.wrapper}>
            <Text style={styles.subtitle}>{t('screens.tag.icRef')}</Text>
            <Text style={styles.text}>{systemInfo?.icReference}</Text>
          </View>
        </View>
      )}

      {!!error && (
          <View>
            <Text style={styles.error}>{t('screens.sensor.errorTitle')}</Text>
            {/*<Text style={styles.error}>{t('screens.sensor.errorRecord')}</Text>*/}
            <Text style={styles.error}>{error}</Text>
          </View>
      )}

          <TouchableOpacity style={styles.buttonRead} onPress={readTag}>
        <Text style={styles.buttonText}>{t('screens.tag.buttonRead')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapper: {
    paddingTop: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    color: '#4b4f58',
    fontWeight: '700',
    alignSelf: 'center',
  },
  instruction: {
    marginTop: 10,
    fontSize: 16,
    color: '#4b4f58',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#483d8b',
  },
  text: {
    fontSize: 16,
    color: '#4b4f58',
  },
  buttonRead: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#4b4f58',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  log: {
    justifyContent: 'center',
    padding: 20,
  },
  error: {
    color: '#e91e63',
    fontSize: 30,
    textAlign:'center'
  },
});
