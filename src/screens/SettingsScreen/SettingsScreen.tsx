import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

export const SettingsScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('Language');
        }}>
        <Text style={styles.textStyles}>{t('screens.settings.itemLanguage')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  touchables: {
    marginTop: 15,
    paddingLeft: 10,
  },
  textStyles: {
    fontSize: 20,
  },
});
