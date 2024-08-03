import React from 'react';
import {View, StyleSheet} from 'react-native';

export const PercentageBar = ({data, colors}): JSX.Element => {
  const total = data.reduce((sum, value) => sum + Number(value), 0);

  const getColor = index => {
    return colors[index % colors.length];
  };

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        {data.map((value, index) => {
          const width = `${(Number(value) / total) * 100}%`;
          return (
            <View
              key={index}
              style={[
                styles.segment,
                {width, backgroundColor: getColor(index)},
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 4,
    alignItems: 'center',
  },
  barContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 20,
    backgroundColor: '#b3b3b4',
    borderRadius: 5,
    overflow: 'hidden',
  },
  segment: {
    height: '100%',
  },
});
