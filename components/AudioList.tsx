import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { COLORS } from '../styles/colors'

interface AudioItem {
  id: string
  name: string
  duration: string
  date: string
}

export default function AudioList() {
  // Datos mock - reemplazar con datos reales cuando se implemente
  const [audioList, setAudioList] = useState<AudioItem[]>([
    { id: '1', name: 'Grabación 1', duration: '00:30', date: '2026-04-15' },
    { id: '2', name: 'Grabación 2', duration: '01:15', date: '2026-04-14' },
  ])

  const renderAudioItem = ({ item }: { item: AudioItem }) => (
    <View style={styles.audioItem}>
      <View style={styles.audioInfo}>
        <Text style={styles.audioName}>{item.name}</Text>
        <Text style={styles.audioDetails}>{item.duration} - {item.date}</Text>
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grabaciones</Text>
      <FlatList
        data={audioList}
        keyExtractor={(item) => item.id}
        renderItem={renderAudioItem}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay grabaciones</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
    padding: 16,
  },
  title: {
    color: COLORS.text,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  audioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  audioInfo: {
    flex: 1,
  },
  audioName: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
  audioDetails: {
    color: COLORS.neon,
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
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  buttonText: {
    color: COLORS.text,
    fontSize: 16,
  },
  emptyText: {
    color: COLORS.neon,
    textAlign: 'center',
    marginTop: 32,
  },
})