import React from 'react'
import { StyleSheet, View } from 'react-native'

export default function NeonLight() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.glowLayer1} />
      <View style={styles.glowLayer2} />
      <View style={styles.glowLayer3} />
      <View style={styles.glowLayer4} />
      <View style={styles.glowLayer5} />
      <View style={styles.glowLayer6} />
      <View style={styles.neonCore} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 15
  },
  glowLayer1: {
    position: 'absolute',
    width: '92%',
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FF0000',
    opacity: 0.06
  },
  glowLayer2: {
    position: 'absolute',
    width: '86%',
    height: 38,
    borderRadius: 20,
    backgroundColor: '#FF0000',
    opacity: 0.1
  },
  glowLayer3: {
    position: 'absolute',
    width: '80%',
    height: 32,
    borderRadius: 30,
    backgroundColor: '#FF0000',
    opacity: 0.14
  },
  glowLayer4: {
    position: 'absolute',
    width: '74%',
    height: 26,
    borderRadius: 20,
    backgroundColor: '#FF0000',
    opacity: 0.2
  },
  glowLayer5: {
    position: 'absolute',
    width: '70%',
    height: 20,
    borderRadius: 20,
    backgroundColor: '#FF0000',
    opacity: 0.3
  },
  glowLayer6: {
    position: 'absolute',
    width: '66%',
    height: 14,
    borderRadius: 20,
    backgroundColor: '#FF0000',
    opacity: 0.44
  },
  neonCore: {
    width: '62%',
    height: 6,
    borderRadius: 5,
    backgroundColor: '#FFF',
    shadowColor: '#FF0000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.95,
    shadowRadius: 1,
  },
})
