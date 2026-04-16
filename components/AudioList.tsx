import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { COLORS } from '../styles/colors'
import { AudioItem } from '../types/AudioItem'
import AudioCard from './AudioCard'


export default function AudioList() {
  // Datos mock - reemplazar con datos reales cuando se implemente
  const [audioList, setAudioList] = useState<AudioItem[]>([
    { id: '1', name: 'Grabación 1', duration: 30, date: new Date('2026-04-15') },
    { id: '2', name: 'Grabación 2', duration: 75, date: new Date('2026-04-14') },
  ])

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Grabaciones</Text>
      <FlatList
        data={audioList}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <AudioCard item={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay grabaciones</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bodyBg,
    padding: 16,
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyText: {
    color: COLORS.light,
    textAlign: 'center',
    marginTop: 32,
  },
})