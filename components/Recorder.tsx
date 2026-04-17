import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../styles/colors'
import RecordButton from './RecordButton'
import AudioList from './AudioList'
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder, useAudioRecorderState } from 'expo-audio'

export default function Recorder() {

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);

  const [modalVisible, setModalVisible] = useState(false);
  const [tempAudioData, setTempAudioData] = useState<{ uri: string, duration: number } | null>(null);
  const [audioName, setAudioName] = useState('');

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {
    await audioRecorder.stop();

    // Guardamos los datos técnicos temporalmente
    setTempAudioData({
      uri: audioRecorder.uri || '',
      duration: Math.floor(audioRecorder.currentTime)
    });

    setAudioName(`Grabación ${new Date().toLocaleTimeString()}`);
    setModalVisible(true);
  };

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        setAudioModeAsync({
          playsInSilentMode: false,
          allowsRecording: false,
        })
        Alert.alert('Permission to access microphone was denied');
      } else {
        setAudioModeAsync({
          playsInSilentMode: true,
          allowsRecording: true,
        })
      }

      ;
    })();
  }, []);
  const handleRecordPress = () => {
    // Lógica para iniciar/detener grabación
    console.log('Record button pressed')
  }


  return (
    <View style={styles.container}>
      <RecordButton onPress={handleRecordPress} />
      <AudioList />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 6.5,
    backgroundColor: COLORS.bodyBg,
  },
})