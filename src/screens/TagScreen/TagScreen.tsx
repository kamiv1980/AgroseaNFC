import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';

const manufCode = {
  2: 'STMicroelectronics',
};

export const TagScreen = ({mainInfo, readTag, systemInfo}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      {!mainInfo && !systemInfo && (
        <View style={styles.log}>
          <Text style={styles.title}>{'Ready...'}</Text>
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
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
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
    alignItems: 'center',
  },
});
