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

  const clearStatistic = () => {
    setNfcData(null);
  };

  const readStatistic = async () => {
    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const tag = await NfcManager.getTag();
      const data = tag?.ndefMessage;
      const payload = data[0]?.payload;

      if (payload) {
        setNfcData(payload);
        await NfcManager.setAlertMessage('Tag found');
      } else {
        await NfcManager.setAlertMessage('No payload found in NFC tag');
      }
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
          <Text style={styles.title}>
            {t('screens.statistic.instructionTitle')}
          </Text>
          <Text style={styles.instruction}>
            {t('screens.statistic.instruction_1')}
          </Text>
          <Text style={styles.instruction}>
            {t('screens.statistic.instruction_2')}
          </Text>
          <Text style={styles.instruction}>
            {t('screens.statistic.instruction_3')}
          </Text>
          <Text style={styles.instruction}>
            {t('screens.statistic.instruction_4')}
          </Text>
        </View>
      )}

      {!!decompressedData && <FieldData data={decompressedData} />}

      {!nfcData && (
        <TouchableOpacity style={styles.buttonRead} onPress={readStatistic}>
          <Text style={styles.buttonText}>
            {t('screens.statistic.buttonRead')}
          </Text>
        </TouchableOpacity>
      )}

      {!!nfcData && (
        <TouchableOpacity style={styles.buttonRead} onPress={clearStatistic}>
          <Text style={styles.buttonText}>
            {t('screens.statistic.buttonClear')}
          </Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 10,
    fontSize: 18,
    color: '#4b4f58',
    fontWeight: '700',
    alignSelf: 'center',
  },
  instruction: {
    marginTop: 10,
    fontSize: 16,
    color: '#4b4f58',
  },
  log: {
    justifyContent: 'center',
    padding: 20,
  },
});
