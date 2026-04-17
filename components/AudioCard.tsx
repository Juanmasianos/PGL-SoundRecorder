import { StyleSheet, Text, Pressable, View, Animated } from 'react-native'
import React from 'react'
import { COLORS } from '../styles/colors'
import { AudioItem, formatTime } from '../types/AudioItem'
import { useRainbow } from './RgbContext';

interface AudioCardProps {
  item: AudioItem;
  onDelete: (uri: string) => void;
  onPlay: (uri: string) => void
  onStop: () => void;
  playingUri: string | null;
}

export default function AudioCard({ item, onDelete, onPlay, onStop, playingUri }: AudioCardProps) {

  const dateFormatted = new Date(item.date).toLocaleDateString();
  const isCurrentlyPlaying = playingUri === item.uri;
  const { dynamicColor } = useRainbow();

  return (
    <View style={styles.cardContainer}>
      <Animated.View style={[styles.deleteButton, { borderColor: dynamicColor }]}>
        <Pressable onPress={() => onDelete(item.id)}>
          <Text style={styles.buttonText}>🗑️</Text>
        </Pressable>
      </Animated.View>
      <Animated.View 
        style={[
          styles.audioItem, 
          { 
            borderColor: dynamicColor,
            backgroundColor: isCurrentlyPlaying ? 'rgba(255, 255, 255, 0.9)' : COLORS.white,
            borderWidth: isCurrentlyPlaying ? 4 : 2 
          }
        ]}
      >
        <View style={styles.audioActions}>
          <Animated.View style={[styles.actionButton, { borderColor: dynamicColor }]}>
            <Pressable onPress={!isCurrentlyPlaying ? () => onPlay(item.uri) : onStop}>
              <Animated.Text style={[styles.buttonText, {color: dynamicColor}]}>
                {!isCurrentlyPlaying ? '▶' : '⏹'}
              </Animated.Text>
            </Pressable>
          </Animated.View>
        </View>

        <View style={styles.audioInfo}>
          <Animated.Text style={[styles.audioName, { color: dynamicColor }]}>
            {item.name}
          </Animated.Text>
          
          <View style={styles.audioRow}>
            <Animated.Text style={[styles.audioDetails, { color: dynamicColor }]}>
              {formatTime(item.duration)}
            </Animated.Text>
            <Animated.Text style={[styles.audioDetails, { color: dynamicColor }]}>
              {dateFormatted}
            </Animated.Text>
          </View>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",
  },
  deleteButton: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
    marginTop: 10,
    borderWidth: 4,
    borderRadius: 20,
  },
  audioItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 10,
    marginBottom: 8,
    marginLeft: 10,
    borderWidth: 4,
    borderRadius: 8,
  },
  audioInfo: {
    flex: 1,
    marginLeft: 40
  },
  audioName: {
    fontSize: 16,
    fontWeight: '600',
  },
  audioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  audioDetails: {
    fontSize: 14,
    marginTop: 4,
  },
  audioActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 20,
  },
})