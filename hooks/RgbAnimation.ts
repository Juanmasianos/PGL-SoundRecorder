import { useEffect, useRef } from 'react';
import { Animated, Easing } from 'react-native';
import { COLORS } from '../styles/colors';

export function useRainbowAnimation(isRecording: boolean) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRecording) {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 5000,
          easing: Easing.linear,
          useNativeDriver: false,
        })
      ).start();
    } else {
      animatedValue.stopAnimation(); 
    }
  }, [isRecording]);

  const rainbowColor = animatedValue.interpolate({
    inputRange: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
    outputRange: [
      COLORS.light, 
      '#ffff00', 
      '#00ff00', 
      '#00ffff',
      '#0000ff',
      '#ff00ff', 
      COLORS.light, 
    ],
  });

  return rainbowColor;
}