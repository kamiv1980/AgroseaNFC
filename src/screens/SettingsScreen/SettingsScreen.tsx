import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

export const SettingsScreen = ({navigation}) => {
  const {t} = useTranslation();

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('Language');
        }}>
        <Ionicons name="language" style={styles.iconStyles} />
        <Text style={styles.textStyles}>{t('screens.settings.itemLanguage')}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('Profile');
        }}>
        <Feather name="users" style={styles.iconStyles} />
        <Text style={styles.textStyles}>{t('screens.settings.itemProfile')}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  touchables: {
    marginTop: 15,
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyles: {
    fontSize: 24,
    color: '#4b4f58',
  },
  textStyles: {
    marginLeft: 8,
    fontSize: 20,
    color: '#4b4f58',
  },
});
