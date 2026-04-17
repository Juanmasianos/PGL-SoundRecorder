import React from 'react'
import { StyleSheet, Text, Pressable } from 'react-native'
import { COLORS } from '../styles/colors'
import { View } from 'react-native'

interface RecordButtonProps {
  onPress: () => void
}

export default function RecordButton({ onPress }: RecordButtonProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.recordButton} onPress={onPress}>
        <Text style={styles.buttonText}>▶</Text>
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