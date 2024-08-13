import React, {useState} from 'react';
import {
  Image,
  PixelRatio,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {ModalView} from '../../components';

export const SensorScreen = ({
  writeTag,
  setAddress,
  address,
  error,
  modalVisible,
  handleCancel,
}) => {
  const [isCyclic, setIsCyclic] = useState(false);
  const toggleSwitch = () => setIsCyclic(previousState => !previousState);
  const {t} = useTranslation();

  const decreaseAddress = () => {
    setAddress(prev => --prev);
  };

  const increaseAddress = () => {
    setAddress(prev => ++prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ModalView
        text={t('screens.sensor.ready')}
        visible={modalVisible}
        handleCancel={handleCancel}
      />
      <View>
        <View style={styles.wrapper}>
          <Text style={styles.subtitle}>{t('screens.sensor.newAddress')}</Text>
          <View style={styles.wrapperInput}>
            <TouchableOpacity
              style={styles.button}
              onPress={decreaseAddress}
              disabled={address <= 1}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.textInput}>{address}</Text>
            <TouchableOpacity style={styles.button} onPress={increaseAddress}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
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
        {!!error ? (
          <>
            <Text style={styles.error}>{t('screens.sensor.errorTitle')}</Text>
            <Text style={styles.error}>{t('screens.sensor.errorRecord')}</Text>
          </>
        ) : (
          <Image
            style={styles.image}
            source={require('../../assets/sensor.png')}
          />
        )}
      </View>

      <View style={styles.wrapper}>
        <Text>* {t('screens.sensor.noteText')}</Text>
        <TouchableOpacity
          style={styles.buttonWrite}
          onPress={() => writeTag(isCyclic)}>
          <Text style={styles.buttonText}>
            {t('screens.sensor.buttonWrite')}
          </Text>
        </TouchableOpacity>
      </View>
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
  },
  buttonWrite: {
    marginTop: 20,
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
    width: PixelRatio.getPixelSizeForLayoutSize(140),
    height: PixelRatio.getPixelSizeForLayoutSize(70),
  },
});
