import React from 'react';
import { Modal, View, Text, TextInput, Pressable, StyleSheet, Animated } from 'react-native';
import { COLORS } from "../styles/colors"
import { useRainbow } from './RgbContext';

interface AudioModalProps {
  visible: boolean;
  audioName: string;
  setAudioName: (name: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export const AudioModal = ({
  visible,
  audioName,
  setAudioName,
  onCancel,
  onSave
}: AudioModalProps) => {

  const { dynamicColor } = useRainbow();

  return (
    <Modal animationType="fade" transparent visible={visible} onRequestClose={onCancel}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Guardar Grabación</Text>
          <TextInput
            style={styles.input}
            value={audioName}
            onChangeText={setAudioName}
            placeholder="Nombre del audio..."
            placeholderTextColor="#999"
            autoFocus
          />
          <View style={styles.modalButtons}>
            <Pressable style={[styles.modalButton, styles.btnCancel]} onPress={onCancel}>
              <Text style={styles.btnText}>Descartar</Text>
            </Pressable>
            <Animated.View style={[styles.animatedBtnContainer, { backgroundColor: dynamicColor }]}>
              <Pressable style={styles.fullClickArea} onPress={onSave}>
                <Text style={styles.btnText}>Guardar</Text>
              </Pressable>
            </Animated.View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: COLORS.headerBG,
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },
  modalTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    width: '100%',
    backgroundColor: '#2c2c2e',
    color: COLORS.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 25,
  },animatedBtnContainer: {
    flex: 1,
    borderRadius: 10,
    marginHorizontal: 5,
    overflow: 'hidden'
  },
  modalButtons: { 
    flexDirection: 'row', 
    width: '100%' 
  },
  modalButton: { 
    flex: 1, 
    paddingVertical: 12, 
    borderRadius: 10, 
    alignItems: 'center', 
    marginHorizontal: 5 
  },
  fullClickArea: {
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
  },
  btnCancel: { 
    backgroundColor: '#3a3a3c' 
  },
  btnText: { 
    color: COLORS.white, 
    fontWeight: '600' 
  },
});