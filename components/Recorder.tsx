import { ActivityIndicator, Alert, StyleSheet, View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS } from '../styles/colors'
import RecordButton from './RecordButton'
import AudioList from './AudioList'
import { RecordingPresets, useAudioRecorder, useAudioRecorderState } from 'expo-audio'
import { AudioModal } from './AudioModal'
import { AudioItem } from '../types/AudioItem'
import { useAudioPlayer } from '../service/audioPlayer'
import { requestPermission } from '../service/RecorderService'
import { StorageService } from '../service/StorageService'

interface RecorderProps {
  onRecordingChange: (isRecording: boolean) => void;
  onPlaybackChange: (isPlaying: boolean) => void;
}

export default function Recorder({ onRecordingChange, onPlaybackChange }: RecorderProps) {

  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const recorderState = useAudioRecorderState(audioRecorder);
  const [audioList, setAudioList] = useState<AudioItem[]>([])

  const [modalVisible, setModalVisible] = useState(false);
  const [tempAudioData, setTempAudioData] = useState<{ uri: string, duration: number } | null>(null);
  const [audioName, setAudioName] = useState('');

  const [isSaving, setIsSaving] = useState(false);

  const { playAudio, stopAudio, playingUri } = useAudioPlayer();

  const deleteAudio = async (id: string) => {
    const updatedList = await StorageService.deleteAudio(id);
    setAudioList(updatedList);
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
    const audios = await StorageService.getAllAudios();
    setAudioList(audios);
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
      const updatedList = await StorageService.saveAudio(newAudio);

      setIsSaving(true);
      setModalVisible(false);
      setAudioList(updatedList);

      setTimeout(() => {
        setIsSaving(false);
        setTempAudioData(null);
        setAudioName('');
      }, 3000);
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar');
    }
  };

  useEffect(() => {
    onRecordingChange(recorderState.isRecording);
  }, [recorderState.isRecording]);

  useEffect(() => {
    onPlaybackChange(!!playingUri); 
  }, [playingUri]);

  useEffect(() => {
    (async () => {
      loadAudios();
      requestPermission();
      onRecordingChange(recorderState.isRecording);
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
      {isSaving && (
        <View style={styles.fullScreenOverlay}>
          <ActivityIndicator size="large" color={COLORS.white} />
          <Text style={styles.loadingText}>Guardando grabación...</Text>
        </View>
      )}
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
  fullScreenOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Por encima de todo
  },
  loadingText: { color: COLORS.white, marginTop: 10 }
})