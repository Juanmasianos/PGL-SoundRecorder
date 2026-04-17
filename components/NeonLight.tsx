import React from 'react'
import { Animated, StyleSheet, View } from 'react-native'
import { useRainbow } from './RgbContext';
import { COLORS } from '../styles/colors';

export default function NeonLight() {

  const { dynamicColor } = useRainbow();

  const animatedGlow = {
    backgroundColor: dynamicColor,
  };

  const animatedCoreShadow = {
    shadowColor: dynamicColor,
  };
  
  return (
    <View style={styles.wrapper}>
      <View style={styles.neon}>
        <Animated.View style={[styles.glowLayer1, animatedGlow]} />
        <Animated.View style={[styles.glowLayer2, animatedGlow]}  />
        <Animated.View style={[styles.glowLayer3, animatedGlow]}  />
        <Animated.View style={[styles.glowLayer4, animatedGlow]}  />
        <Animated.View style={[styles.glowLayer5, animatedGlow]}  />
        <Animated.View style={[styles.glowLayer6, animatedGlow]}  />
        <Animated.View 
          style={[
            styles.neonCore, 
            animatedCoreShadow 
          ]} 
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#222222',
    flex: 1,
  },
  neon: {
    marginTop: 15,
    alignItems: "center",
    justifyContent: "center"
  },
  glowLayer1: {
    position: 'absolute',
    width: '92%',
    height: 44,
    borderRadius: 22,
    opacity: 0.06
  },
  glowLayer2: {
    position: 'absolute',
    width: '86%',
    height: 38,
    borderRadius: 20,
    opacity: 0.1
  },
  glowLayer3: {
    position: 'absolute',
    width: '80%',
    height: 32,
    borderRadius: 30,
    opacity: 0.14
  },
  glowLayer4: {
    position: 'absolute',
    width: '74%',
    height: 26,
    borderRadius: 20,
    opacity: 0.2
  },
  glowLayer5: {
    position: 'absolute',
    width: '70%',
    height: 20,
    borderRadius: 20,
    opacity: 0.3
  },
  glowLayer6: {
    position: 'absolute',
    width: '66%',
    height: 14,
    borderRadius: 20,
    opacity: 0.44
  },
  neonCore: {
    width: '62%',
    height: 6,
    borderRadius: 5,
    backgroundColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.95,
    shadowRadius: 1,
  },
})
