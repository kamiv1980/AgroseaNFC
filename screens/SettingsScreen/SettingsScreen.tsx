import {SafeAreaView, StyleSheet, Text, View} from 'react-native';

export const SettingsScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.log}>
        <Text style={styles.title}>{'Coming soon'}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 20,
    fontSize: 20,
  },
  log: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
