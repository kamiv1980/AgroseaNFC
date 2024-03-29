import {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export const MemoryScreen = ({writeTag, setAddress, address, error}) => {
  const [isCyclic, setIsCyclic] = useState(false);
  const toggleSwitch = () => setIsCyclic(previousState => !previousState);

  const decreaseAddress = () => {
    setAddress(prev => --prev);
  };

  const increaseAddress = () => {
    setAddress(prev => ++prev);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.wrapper}>
          <Text style={styles.subtitle}>New Address</Text>
          <View style={styles.wrapperInput}>
            <TouchableOpacity
              style={styles.button}
              onPress={decreaseAddress}
              disabled={address <= 1}>
              <Text style={styles.buttonText}>-</Text>
            </TouchableOpacity>

            <Text style={styles.textInput}>{address}</Text>
            <TouchableOpacity style={styles.button} onPress={increaseAddress}>
              <Text style={styles.buttonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.wrapperInput}>
          <Text style={styles.subtitle}>Сyclic recording</Text>
          <Switch
            style={styles.switch}
            trackColor={{false: '#767577', true: '#006C5B'}}
            thumbColor={'#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isCyclic}
          />
        </View>
      </View>
      {!!error && (
        <View style={styles.wrapper}>
          <Text style={styles.error}>Something went wrong,</Text>
          <Text style={styles.error}>Recording failed!</Text>
        </View>
      )}
      <TouchableOpacity
        style={styles.buttonWrite}
        onPress={() => writeTag(isCyclic)}>
        <Text style={styles.buttonText}>Write</Text>
      </TouchableOpacity>
      {/*<TouchableOpacity style={styles.buttonWrite} onPress={writeTag}>*/}
      {/*  <Text style={styles.buttonText}>Cancel</Text>*/}
      {/*</TouchableOpacity>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  wrapper: {
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  wrapperInput: {
    marginTop: 40,
    paddingLeft: 20,
    paddingRight: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 700,
    color: '#483d8b',
  },
  text: {
    fontSize: 20,
  },
  switch: {
    marginLeft: 20,
  },
  textInput: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#483d8b',
    width: 100,
  },
  buttonWrite: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B',
  },
  button: {
    width: 70,
    height: 70,
    marginLeft: 20,
    marginRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
  error: {
    color: '#e91e63',
    fontSize: 30,
  },
});
