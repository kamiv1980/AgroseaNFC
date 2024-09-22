import React, {useState} from 'react';
import {
  Image,
  PixelRatio,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import NfcManager, {
  Nfc15693RequestFlagIOS,
  NfcTech,
} from 'react-native-nfc-manager';
import {useTranslation} from 'react-i18next';

import {ModalView} from '../../components';
import {calculateCRC32} from '../../utils/getControlSum';

export const SensorScreen = () => {
  const [error, setError] = useState('');
  const [log, setLog] = useState('');
  const [address, setAddress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCyclic, setIsCyclic] = useState(false);

  const toggleSwitch = () => setIsCyclic(previousState => !previousState);
  const {t} = useTranslation();

  const decreaseAddress = () => {
    setError('');
    setLog('');
    setAddress(prev => --prev);
  };

  const increaseAddress = () => {
    setError('');
    setLog('');
    setAddress(prev => ++prev);
  };

  const readTag = () => {
    setError('');
    setLog('');
    Platform.OS === 'ios' ? readTagIOS() : readTagAndroid();
  };

  const writeTag = isCyclic => {
    setError('');
    setLog('');
    Platform.OS === 'ios' ? writeTagIOS(isCyclic) : writeTagAndroid(isCyclic);
  };

  const readTagIOS = async () => {
    try {
      // register for the NFC tag with Iso15693IOS in it
      await NfcManager.requestTechnology(NfcTech.Iso15693IOS);
      // the resolved tag object will contain `ndefMessage` property

      const handler = NfcManager.iso15693HandlerIOS;

      const blockBytes = await handler.readSingleBlock({
        flags: Nfc15693RequestFlagIOS.HighDataRate,
        blockNumber: 5,
      });
      Array.isArray(blockBytes) && setAddress(blockBytes[0]);
      await NfcManager.setAlertMessage('Tag found');
    } catch (ex) {
      await NfcManager.setAlertMessage(`Oops! ${ex.toString()}`);
      setError(ex.toString());
    } finally {
      // stop the nfc scanning
      NfcManager.cancelTechnologyRequest();
    }
  };

  const readTagAndroid = async () => {
    setModalVisible(true);

    try {
      await NfcManager.requestTechnology(NfcTech.NfcV);

      let tag = await NfcManager.getTag();

      const idBytes = tag.id.split(/(..)/g).filter(s => s);
      idBytes.forEach((val, i, a) => (a[i] = parseInt(val, 16)));

      const blockBytes = await NfcManager.transceive([32, 32, ...idBytes, 5]);
      Array.isArray(blockBytes) && setAddress(blockBytes[1]);
      setLog('Tag found');
    } catch (ex) {
      setError(ex.toString());
      setLog(ex.toString());
    } finally {
      // stop the nfc scanning
      setTimeout(() => {
        onCancel();
      }, 2000);
    }
  };

  const writeTagIOS = async isCyclic => {
    try {
      await NfcManager.requestTechnology(NfcTech.Iso15693IOS, {
        alertMessage: t('screens.sensor.ready'),
      });

      const handler = NfcManager.iso15693HandlerIOS;

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
      await NfcManager.setAlertMessage('Oops! Error!');
      setError(ex.toString());
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  const writeTagAndroid = async isCyclic => {
    setModalVisible(true);

    try {
      await NfcManager.requestTechnology(NfcTech.NfcV);

      const tag = await NfcManager.getTag();

      const idBytes = tag.id.split(/(..)/g).filter(s => s);
      idBytes.forEach((val, i, a) => (a[i] = parseInt(val, 16)));
      let blockBytes = await NfcManager.transceive([32, 32, ...idBytes, 5]);

      blockBytes = blockBytes.slice(1);

      if (Array.isArray(blockBytes)) {
        const newBlock = blockBytes.map((el, idx) =>
          idx === 0 ? address : el,
        );

        // await NfcManager.transceive([33, 33, ...idBytes, 5, ...newBlock]);
        await NfcManager.transceive([0x20, 0x21, ...idBytes, 5, ...newBlock]);

        let blockBytesForCRC = [];
        for (let i = 0; i <= 6; i++) {
          let block = await NfcManager.transceive([32, 32, ...idBytes, i]);
          blockBytesForCRC.push(...block.slice(1));
        }

        const crc32 = calculateCRC32(blockBytesForCRC);
        // await NfcManager.transceive([33, 33, ...idBytes, 7, ...crc32]);
        await NfcManager.transceive([0x20, 0x21, ...idBytes, 7, ...crc32]);
      }

      !!isCyclic && setAddress(prev => ++prev);
      setLog('Success');
    } catch (ex) {
      setError(ex.toString());
      setLog(ex.toString());
    } finally {
      setTimeout(() => {
        onCancel();
      }, 2000);
    }
  };

  const onCancel = () => {
    NfcManager.cancelTechnologyRequest();
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <ModalView
          text={log ? log : t('screens.sensor.ready')}
          visible={modalVisible}
          handleCancel={onCancel}
        />
        <View style={styles.wrapper}>
          <Text style={styles.subtitle}>{t('screens.sensor.newAddress')}</Text>
          <View style={styles.wrapperInput}>
            <TouchableOpacity
              style={styles.button}
              onPress={decreaseAddress}
              disabled={address <= 0}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.textInput}>{address}</Text>
            <TouchableOpacity style={styles.button} onPress={increaseAddress}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.wrapperInput}>
            <Text style={styles.subtitle}>
              {t('screens.sensor.cyclicRecording')}
            </Text>
            <Switch
              style={styles.switch}
              trackColor={{false: '#767577', true: '#f0b400'}}
              thumbColor={'#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isCyclic}
            />
          </View>
        </View>

        <View style={styles.wrapper}>
          {error ? (
            <View style={styles.image}>
              <Text style={styles.error}>{t('screens.sensor.errorTitle')}</Text>
              <Text style={styles.error}>
                {t('screens.sensor.errorRecord')}
              </Text>
              <Text style={styles.error}>{error}</Text>
            </View>
          ) : (
            <Image
              style={styles.image}
              source={require('../../assets/sensor.png')}
            />
          )}
        </View>

        <View style={styles.wrapper}>
          <Text>* {t('screens.sensor.noteText')}</Text>
          <TouchableOpacity style={styles.buttonWrite} onPress={readTag}>
            <Text style={styles.buttonText}>
              {t('screens.sensor.buttonRead')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonWrite}
            disabled={address <= 0}
            onPress={() => writeTag(isCyclic)}>
            <Text style={styles.buttonText}>
              {t('screens.sensor.buttonWrite')}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  wrapperInput: {
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#4b4f58',
  },
  switch: {
    marginLeft: 20,
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#4b4f58',
    width: 100,
    color: '#4b4f58',
  },
  buttonWrite: {
    marginTop: 10,
    width: '100%',
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#4b4f58',
  },
  button: {
    width: 70,
    height: 70,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#4b4f58',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  error: {
    color: '#e91e63',
    fontSize: 30,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: PixelRatio.getPixelSizeForLayoutSize(140),
    height: PixelRatio.getPixelSizeForLayoutSize(80),
  },
});
