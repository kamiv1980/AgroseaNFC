import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from "react-i18next";

export const MenuScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        <Text style={styles.textStyles}>{t('screens.more.itemSettings')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('Trial');
        }}>
        <Text style={styles.textStyles}>{t('screens.more.itemTrial')}</Text>
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
