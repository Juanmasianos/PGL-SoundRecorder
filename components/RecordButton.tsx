import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { COLORS } from '../styles/colors'
import { View } from 'react-native'
import { RecorderState } from 'expo-audio'

interface RecordButtonProps {
  onPress: () => void
  recordState: RecorderState
}

export default function RecordButton({ onPress, recordState }: RecordButtonProps, ) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.recordButton} onPress={onPress}>
        <Text style={styles.buttonText}>{recordState?.isRecording ? '■' : '▶'}</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    alignSelf: "center"
  },
  recordButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: COLORS.light,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 60,
    marginBottom: 8,
    marginLeft: 6
  },
})