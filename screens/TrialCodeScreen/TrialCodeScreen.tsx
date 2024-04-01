import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

export const TrialCodeScreen = () => {
  const [id, setId] = useState(null);
  const [password, setPassword] = useState('');
  const [code, setCode] = useState(null);
  const [key, setKey] = useState(null);

  const magicResetNumber = 43210;
  const magicNumber = 0x7d0e;
  const magicDeactivateNumber = 54321;

  const getNewKeys = () => {
    const code = ((magicDeactivateNumber - id) & 0xFFFF) ^ magicNumber;
    const key = ((magicResetNumber - id) & 0xFFFF) ^ magicNumber;
    setCode(code);
    setKey(key);
  };

  const handleReset = () => {
    setCode(null);
    setKey(null);
    setId(null);
    setPassword('');
  };

  const handleChange = value => {
    if (!isNaN(Number(value)) && value.toString().length <= 5) {
      setId(value);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {(!code || !key) && (
        <View>
          <Text style={styles.title}>{'Enter trial key'}</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleChange}
            value={id}
            keyboardType="numeric"
          />
          <Text style={styles.title}>{'Enter admin password'}</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={getNewKeys}
            disabled={
              !id || id.toString().length !== 5 || password !== 'admin'
            }>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}
      {!!code && (
        <View>
          <Text style={styles.title}>Key deactivation trial</Text>
          <Text style={styles.title}>{String(code).padStart(5, '0')}</Text>
        </View>
      )}

      {!!key && (
        <View>
          <Text style={styles.title}>Key prolongation trial</Text>
          <Text style={styles.title}>{String(key).padStart(5, '0')}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.button} onPress={handleReset}>
        <Text style={styles.buttonText}>Reset</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 20,
  },
  input: {
    height: 50,
    margin: 20,
    paddingLeft: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#483d8b',
  },
  button: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#006C5B',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 20,
  },
});
