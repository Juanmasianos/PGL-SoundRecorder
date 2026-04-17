import { StyleSheet, Text, Pressable, View } from 'react-native'
import React from 'react'
import { COLORS } from '../styles/colors'
import { AudioItem, formatTime } from '../types/AudioItem'

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

  return (
    <View style={styles.cardContainer}>
      <Pressable style={styles.deleteButton} onPress={() => onDelete(item.id)}>
        <Text style={styles.buttonText}>🗑️</Text>
      </Pressable>
      <View style={styles.audioItem}>
        <View style={styles.audioActions}>
          {!isCurrentlyPlaying ? (
          <Pressable style={styles.actionButton} onPress={() => onPlay(item.uri)}>
            <Text style={styles.buttonText}>▶</Text>
          </Pressable>
        ) : (
          <Pressable style={styles.actionButton} onPress={onStop}>
            <Text style={styles.buttonText}>⏹</Text>
          </Pressable>
        )}
        </View>
        <View style={styles.audioInfo}>
          <Text style={styles.audioName}>{item.name}</Text>
          <View style={styles.audioRow}>
            <Text style={styles.audioDetails}>{formatTime(item.duration)} </Text>
            <Text style={styles.audioDetails}>{dateFormatted} </Text>
          </View>
        </View>
      </View>
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
    borderWidth: 2,
    borderRadius: 20,
    borderColor: COLORS.light,
  },
  audioItem: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: COLORS.white,
    padding: 10,
    marginBottom: 8,
    marginLeft: 10,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: COLORS.light,
  },
  audioInfo: {
    flex: 1,
    marginLeft: 40
  },
  audioName: {
    color: COLORS.light,
    fontSize: 16,
    fontWeight: '600',
  },
  audioRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  audioDetails: {
    color: COLORS.light,
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
    borderWidth: 2,
    borderRadius: 20,
    borderColor: COLORS.light,
  },
  buttonText: {
    color: COLORS.headerBG,
    fontSize: 16,
  },
})