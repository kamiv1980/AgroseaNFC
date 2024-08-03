import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const SectionContainer = ({title, children}) => {
  return (
    <View style={[styles.section, styles.shadowStyles]}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 16,
    borderRadius: 4,
    padding: 6,
    borderWidth: 1,
    borderColor: '#c4c2c2',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    color: '#4b4f58',
  },
  shadowStyles: {
    backgroundColor: '#fff',
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
});
