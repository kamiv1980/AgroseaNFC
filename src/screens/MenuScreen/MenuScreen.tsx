import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import {useTranslation} from 'react-i18next';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {ProfileContext} from '../../context/ProfileContextMangement';

export const MenuScreen = ({navigation, hasNfc}) => {
  const {t} = useTranslation();
  const {profile} = useContext(ProfileContext);

  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        <MaterialIcons name="settings" style={styles.iconStyles} />
        <Text style={styles.textStyles}>{t('screens.more.itemSettings')}</Text>
      </TouchableOpacity>
      {profile === 'admin' && (
        <TouchableOpacity
          style={styles.touchables}
          onPress={() => {
            navigation.navigate('Trial');
          }}>
          <MaterialIcons name="access-time-filled" style={styles.iconStyles} />
          <Text style={styles.textStyles}>{t('screens.more.itemTrial')}</Text>
        </TouchableOpacity>
      )}
      {hasNfc && (
        <TouchableOpacity
          style={styles.touchables}
          onPress={() => {
            navigation.navigate('TagInfo');
          }}>
          <MaterialCommunityIcons name="memory" style={styles.iconStyles} />
          <Text style={styles.textStyles}>{t('screens.more.itemTag')}</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('About');
        }}>
        <MaterialIcons name="info-outline" style={styles.iconStyles} />
        <Text style={styles.textStyles}>{t('screens.more.itemAbout')}</Text>
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
