import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

export const TextField = ({
  title,
  value,
  warning,
  label,
}: {
  title: string;
  value: string;
  warning?: boolean;
  label?: string;
}): JSX.Element => {
  return (
    <View style={styles.container}>
      {!!label && <View style={[styles.label, {backgroundColor: label}]} />}
      <Text style={!!warning ? {color:'#a41002'} : null}>{title}</Text>
      <Text style={[styles.value, !!warning ? {color:'#a41002'} : null]}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 10,
    height: 12,
    marginRight: 4,
    borderRadius: 2,
  },
  value: {
    marginLeft: 'auto',
  },
});
