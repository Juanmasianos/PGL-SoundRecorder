import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Header from './components/Header';
import Recorder from './components/Recorder';

export default function App() {
  return (
    <>
      <Header />
      <Recorder />
    </>
  );
}

const styles = StyleSheet.create({});
