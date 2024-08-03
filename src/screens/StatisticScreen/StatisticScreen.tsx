import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import NfcManager, {NfcTech} from 'react-native-nfc-manager';
import {useTranslation} from 'react-i18next';
import useBzip2Data from '../../utils/useBzip2Data';
import {FieldData} from './components';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {generateHTML} from "../../utils/genarateHTML";

export const StatisticScreen = () => {
  const [nfcData, setNfcData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {t} = useTranslation();

  const decompressedData = useBzip2Data(nfcData);

  const clearStatistic = () => {
    setNfcData(null);
  };

  const downloadStatistic = async () => {
    setIsLoading(true);

    const htmlString = generateHTML(decompressedData, t);
    console.log(htmlString)
    try {
      const options = {
        html: htmlString,
        fileName: `statistic(${new Date().toLocaleString()})`,
        directory: Platform.OS === 'android' ? 'Downloads' : 'Documents',
      };
      const file = await RNHTMLtoPDF.convert(options);
      Alert.alert('Success', `PDF saved to ${file.filePath}`);
      setIsLoading(false);
    } catch (error: any) {
      Alert.alert('Error', error.message);
      setIsLoading(false);
    }
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

      {!!isLoading && <ActivityIndicator style={styles.loader} size="large" color="#f0b400" />}

      {!!decompressedData && <FieldData data={decompressedData} />}

      {!nfcData && (
        <TouchableOpacity style={styles.buttonRead} onPress={readStatistic}>
          <Text style={styles.buttonText}>
            {t('screens.statistic.buttonRead')}
          </Text>
        </TouchableOpacity>
      )}

      {!!nfcData && (
          <>
            <TouchableOpacity style={styles.buttonDownload} onPress={downloadStatistic}>
            <MaterialIcons name="download" style={styles.iconStyles} />
          </TouchableOpacity>
            <TouchableOpacity style={styles.buttonClear} onPress={clearStatistic}>
              <MaterialIcons name="close" style={styles.iconStyles} />
            </TouchableOpacity>
          </>
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
  buttonDownload: {
    opacity: .8,
    position: 'absolute',
    bottom:70,
    right:12,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor: '#4b4f58',
    borderRadius:50,
  },
  buttonClear: {
    opacity: .8,
    position: 'absolute',
    bottom:10,
    right:12,
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:50,
    height:50,
    backgroundColor: '#4b4f58',
    borderRadius:50,
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
  iconStyles: {
    fontSize: 32,
    color: '#fff',
  },
  loader: {
    position:'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex:5
  },
});
