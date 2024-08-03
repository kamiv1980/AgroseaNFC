import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Underline = (): JSX.Element => {
  return <View style={styles.underline}></View>;
};

const styles = StyleSheet.create({
  underline: {
    width: '100%',
    height: 1,
    backgroundColor: '#b3b3b4',
    marginBottom: 4,
    marginTop: 6,
  },
});
