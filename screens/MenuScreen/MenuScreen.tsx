import {SafeAreaView, StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';

export const MenuScreen = ({navigation}) => {
  return (
    <SafeAreaView>
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('Settings');
        }}>
        <Text style={styles.textStyles}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.touchables}
        onPress={() => {
          navigation.navigate('Trial');
        }}>
        <Text style={styles.textStyles}>Get Reset code</Text>
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
