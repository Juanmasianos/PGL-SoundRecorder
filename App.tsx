import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import NeonLight from './components/NeonLight';
import Recorder from './components/Recorder';
import { RgbProvider } from './components/RgbContext';
import { useState } from 'react';

export default function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const isPartyTime = isRecording || isPlaying;

  return (
    <RgbProvider isActive={isPartyTime}>
      <Header />
      <NeonLight />
      <Recorder 
        onRecordingChange={setIsRecording} 
        onPlaybackChange={setIsPlaying} 
      />
      <NeonLight />
    </RgbProvider>
  );
}