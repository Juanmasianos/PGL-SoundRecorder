import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../styles/colors'
import { AudioItem } from '../types/AudioItem'

export default function AudioCard({ item }: { item: AudioItem }) {
  return ( 
    <View style={styles.audioItem}>
      <View style={styles.audioInfo}>
        <Text style={styles.audioName}>{item.name}</Text>
        <Text style={styles.audioDetails}>{item.duration} - {item.date.toLocaleDateString()}</Text>
      </View>
      <View style={styles.audioActions}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>▶</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.buttonText}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  audioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  audioInfo: {
    flex: 1,
  },
  audioName: {
    color: COLORS.headerBG,
    fontSize: 16,
    fontWeight: '600',
  },
  audioDetails: {
    color: COLORS.light,
    fontSize: 12,
    marginTop: 4,
  },
  audioActions: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: COLORS.headerBG,
    fontSize: 16,
  },
})