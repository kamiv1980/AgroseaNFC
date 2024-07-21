import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {useTranslation} from 'react-i18next';
import useBzip2Data from '../../utils/useBzip2Data';
import {FieldData} from './components';

export const StatisticScreen = () => {
  const [nfcData, setNfcData] = useState(null);
  const {t} = useTranslation();

  const decompressedData = useBzip2Data(nfcData);

  const readStatistic = async () => {
    setNfcData(null);
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      const data = tag?.ndefMessage?.payload;

      if (data) {
        setNfcData(data);
      } else {
        console.warn('No payload found in NFC tag');
      }

      await NfcManager.setAlertMessage('Tag found');
    } catch (ex) {
      await NfcManager.setAlertMessage(`Oops! ${ex}`);
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {!decompressedData && (
        <View style={styles.log}>
          <Text style={styles.title}>{'Ready...'}</Text>
        </View>
      )}

      {!!decompressedData && <FieldData data={decompressedData} />}

      <TouchableOpacity style={styles.buttonRead} onPress={readStatistic}>
        <Text style={styles.buttonText}>{t('screens.tag.buttonRead')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  buttonRead: {
    marginTop: 'auto',
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
  title: {
    marginTop: 20,
    fontSize: 20,
    color: '#4b4f58',
  },
  log: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
