import { StyleSheet, View } from 'react-native'
import React from 'react'
import { COLORS } from '../styles/colors'
import RecordButton from './RecordButton'

export default function Recorder() {
  const handleRecordPress = () => {
    // Lógica para iniciar/detener grabación
    console.log('Record button pressed')
  }

  return (
    <View style={styles.container}>
      <RecordButton onPress={handleRecordPress} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 70,
    backgroundColor: COLORS.bodyBg,
    justifyContent: 'center',
    alignItems: 'center',
  },
})