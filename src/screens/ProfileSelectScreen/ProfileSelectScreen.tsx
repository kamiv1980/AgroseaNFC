import {
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {ProfileContext} from '../../context/ProfileContextMangement';
import {useTranslation} from 'react-i18next';

const PROFILES = [
  {id: 'user', label: 'User'},
  {id: 'admin', label: 'Admin'},
];
const KEY = 'shaman';

export const ProfileSelectScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const state = useContext(ProfileContext);
  const selectedProfile = state.profile;
  const {t} = useTranslation();

  const setProfile = id => {
    if (id === 'admin') {
      setModalVisible(true);
    } else {
      state.setProfile(id);
    }
  };

  const handleSubmit = () => {
    if (password === KEY) {
      state.setProfile('admin');
      handleCancel();
    } else {
      setError(t('screens.profile.errorPassword'));
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setError('');
    setPassword('');
  }


  return (
    <SafeAreaView>
      <View style={styles.container}>
        {PROFILES.map(profile => {
          const isSelected = profile.id === selectedProfile;

          return (
            <Pressable
              key={profile.id}
              style={styles.wrapper}
              disabled={isSelected}
              onPress={() => setProfile(profile.id)}>
              <Text style={[isSelected ? styles.selectedText : styles.text]}>
                {profile.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={handleCancel}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{t('screens.profile.inputPassword')}</Text>
            <TextInput
              autoCapitalize={'none'}
              style={styles.modalInput}
              onChangeText={setPassword}
              value={password}
            />
            <Text style={[styles.modalText, styles.error]}>{error}</Text>

            <View style={styles.modalActions}>
              <Pressable
                style={styles.button}
                onPress={handleCancel}>
                <Text style={styles.buttonText}>{t('common.cancel')}</Text>
              </Pressable>
              <Pressable
                style={styles.button}
                onPress={handleSubmit}>
                <Text style={styles.buttonText}>{t('common.ok')}</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  wrapper: {
    marginTop: 10,
  },
  text: {
    fontSize: 18,
    color: '#4b4f58',
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    maxWidth: '90%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalActions: {
    margin: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
  button: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#4b4f58',
  },
  modalText: {
    fontSize: 20,
    color: '#4b4f58',
  },
  error: {
    color: '#e91e63',
  },
  buttonText: {
    fontSize: 20,
    color: '#ffffff',
  },
  modalInput: {
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    paddingLeft: 10,
    fontSize: 20,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#483d8b',
    minWidth: '90%',
    maxWidth: '90%',
  },
});
