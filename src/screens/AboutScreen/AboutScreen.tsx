import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  PixelRatio
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {URLButton} from '../../components';

const companydURL = 'https://www.agrosea.eu/';

export const AboutScreen = () => {
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>{t('screens.about.description_1')}</Text>
      <Text style={styles.text}>{t('screens.about.description_2')}</Text>
      <Text style={styles.text}>{t('screens.about.version')}</Text>
      <Image style={styles.logo} source={require('../../assets/logo.png')} />
      <URLButton url={companydURL}>www.agrosea.eu</URLButton>
      <Text style={styles.term}>{t('screens.about.terms')}</Text>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    paddingTop: 20,
    paddingRight: 20,
    paddingLeft: 20,
    fontSize: 16,
    color: '#4b4f58',
    textAlign: 'left',
  },
  logo: {
    width: PixelRatio.getPixelSizeForLayoutSize(140),
    height: PixelRatio.getPixelSizeForLayoutSize(140),
    alignSelf: 'center',
  },
  term: {
    marginTop: 'auto',
    fontSize: 10,
    padding: 10,
  },
});
