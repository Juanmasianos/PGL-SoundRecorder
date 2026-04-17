import { AudioModule, setAudioModeAsync } from "expo-audio";
import { Alert } from "react-native";

export async function requestPermission() {
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
}