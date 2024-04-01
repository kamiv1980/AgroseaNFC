import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export const SettingsScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('Language');
        }}>
        <Text style={styles.textStyles}>Language</Text>
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
