import React from 'react';
import {StyleSheet, Modal, View, Text, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ModalView = ({text, visible, handleCancel}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{text}</Text>
        <MaterialCommunityIcons style={styles.modalIcon} name="nfc" />
        <Pressable style={styles.button} onPress={handleCancel}>
          <Text style={styles.textStyle}>Cancel</Text>
        </Pressable>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modalView: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    bottom: 0,
    backgroundColor: '#fff',
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
  modalText: {
    fontSize: 32,
  },
  modalIcon: {
    marginTop: 64,
    color: '#483d8b',
    fontSize: 80,
  },
  button: {
    marginTop: 64,
    borderRadius: 20,
    padding: 12,
    width: '70%',
    elevation: 2,
    backgroundColor: '#4b4f58',
  },
  textStyle: {
    color: '#fff',
    fontSize: 24,
    textAlign: 'center',
  },
});
