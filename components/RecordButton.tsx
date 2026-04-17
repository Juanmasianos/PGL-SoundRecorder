import React from 'react'
import { StyleSheet, Text, Pressable, Animated } from 'react-native'
import { COLORS } from '../styles/colors'
import { View } from 'react-native'
import { RecorderState } from 'expo-audio'
import { useRainbow } from './RgbContext'

interface RecordButtonProps {
  onPress: () => void
  recordState: RecorderState
}

export default function RecordButton({ onPress, recordState }: RecordButtonProps, ) {

  const { dynamicColor } = useRainbow();

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.recordButton, { borderColor: dynamicColor }]}>
        <Pressable 
          style={styles.pressableArea} 
          onPress={onPress}
        >
          <Animated.Text style={[styles.buttonText, {color: dynamicColor}]}>
            {recordState?.isRecording ? '■' : '▶'}
          </Animated.Text>
        </Pressable>
      </Animated.View>
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
    borderWidth: 4,
    backgroundColor: 'transparent',
  },
  pressableArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 60,
    marginBottom: 8,
    marginLeft: 6
  },
})