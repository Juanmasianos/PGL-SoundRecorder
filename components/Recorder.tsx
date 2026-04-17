import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../styles/colors'
import RecordButton from './RecordButton'
import AudioList from './AudioList'
import { AudioModule, RecordingPresets, setAudioModeAsync, useAudioRecorder, useAudioRecorderState } from 'expo-audio'
import { AudioModal } from './AudioModal'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioItem } from '../types/AudioItem'
import { useAudioPlayer } from '../service/audioPlayer'

export default function Recorder() {

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [audioList, setAudioList] = useState<AudioItem[]>([])

  const [modalVisible, setModalVisible] = useState(false);
  const [tempAudioData, setTempAudioData] = useState<{ uri: string, duration: number } | null>(null);
  const [audioName, setAudioName] = useState('');

  const { playAudio, stopAudio, playingUri } = useAudioPlayer();

  const deleteAudio = async (id: string) => {
    const updatedList = audioList.filter(item => item.id !== id);
    setAudioList(updatedList);
    await AsyncStorage.setItem('List_of_audios', JSON.stringify(updatedList));
  };

  const record = async () => {
    await audioRecorder.prepareToRecordAsync();
    audioRecorder.record();
  };

  const stopRecording = async () => {

    const duration = Math.floor(recorderState.durationMillis / 1000)
    await audioRecorder.stop();

    setTempAudioData({
      uri: audioRecorder.uri || '',
      duration: duration
    });

    setAudioName(`Grabación ${new Date().toLocaleTimeString()}`);
    setModalVisible(true);
  };

  const loadAudios = async () => {
    const stored = await AsyncStorage.getItem('List_of_audios');
    if (stored) setAudioList(JSON.parse(stored));
  };

  const saveFinalAudio = async () => {
    if (!tempAudioData) return;

    const newAudio = {
      id: Date.now().toString(),
      name: audioName || 'Sin nombre',
      duration: tempAudioData.duration,
      date: new Date(),
      uri: tempAudioData.uri,
    };

    try {
      const STORAGE_KEY = 'List_of_audios';

      const storedData = await AsyncStorage.getItem(STORAGE_KEY);

      const existingList = storedData ? JSON.parse(storedData) : [];
      const updatedList = [newAudio, ...existingList];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      setAudioList(updatedList);

      // Limpiar y cerrar
      setModalVisible(false);
      setTempAudioData(null);
      setAudioName('');

    } catch (e) {
      console.error("Error al guardar la lista completa:", e);
      Alert.alert('Error', 'No se pudo actualizar la lista de audios');
    }
  };

  useEffect(() => {
    (async () => {
      loadAudios();
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
    if (recorderState.isRecording) {
      stopRecording()
    } else {
      record()
    }
  }


  return (
    <View style={styles.container}>
      <RecordButton onPress={handleRecordPress} recordState={recorderState} />
      <AudioList
        audioList={audioList}
        setAudioList={setAudioList}
        onDelete={deleteAudio}
        onPlay={playAudio}
        onStop={stopAudio}
        playingUri={playingUri}
      />
      <AudioModal
        visible={modalVisible}
        audioName={audioName}
        setAudioName={setAudioName}
        onCancel={() => setModalVisible(false)}
        onSave={saveFinalAudio}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 6.5,
    backgroundColor: COLORS.bodyBg,
  },
})