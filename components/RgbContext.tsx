import React, { createContext, useContext } from 'react';
import { Animated } from 'react-native';
import { useRainbowAnimation } from '../hooks/RgbAnimation';
import { COLORS } from '../styles/colors';

interface RainbowContextProps {
  dynamicColor: any; 
  isActive: boolean; 
}

const RainbowContext = createContext<RainbowContextProps | undefined>(undefined);

export const RgbProvider: React.FC<{ isActive: boolean; children: React.ReactNode }> = ({ isActive, children }) => {
  const animatedColor = useRainbowAnimation(isActive);

  const dynamicColor = animatedColor

  return (
    <RainbowContext.Provider value={{ dynamicColor, isActive }}>
      {children}
    </RainbowContext.Provider>
  );
};

export const useRainbow = () => {
  const context = useContext(RainbowContext);
  if (!context) {
    throw new Error("useRainbow debe usarse dentro de un RgbProvider");
  }
  return context;
};