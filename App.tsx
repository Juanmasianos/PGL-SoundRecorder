import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import NeonLight from './components/NeonLight';
import Recorder from './components/Recorder';

export default function App() {
  return (
    <>
      <Header />
      <NeonLight />
      <Recorder />
    </>
  );
}

const styles = StyleSheet.create({});
