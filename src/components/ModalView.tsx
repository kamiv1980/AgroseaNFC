import React from 'react';
import {StyleSheet, Modal, View, Text, Pressable} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export const ModalView = ({text, visible}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.modalView}>
        <Text style={styles.modalText}>{text}</Text>
        <MaterialCommunityIcons style={styles.modalIcon} name="nfc" />
        {/*<Pressable style={styles.button} onPress={() => {}}>*/}
        {/*  <Text style={styles.textStyle}>Hide Modal</Text>*/}
        {/*</Pressable>*/}
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
    fontSize: 96,
  },
  // button: {
  //   borderRadius: 20,
  //   padding: 10,
  //   elevation: 2,
  //   backgroundColor: '#2196F3',
  // },
  // textStyle: {
  //   color: 'white',
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  // },
});
