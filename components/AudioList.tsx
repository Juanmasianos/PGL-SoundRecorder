import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import { COLORS } from '../styles/colors'
import { AudioItem } from '../types/AudioItem'
import AudioCard from './AudioCard'


export default function AudioList() {
  // Datos mock - reemplazar con datos reales cuando se implemente
  const [audioList, setAudioList] = useState<AudioItem[]>([
    { id: '1', name: 'Grabación 1', duration: 30, date: new Date('2026-04-15') },
    { id: '2', name: 'Grabación 2', duration: 75, date: new Date('2026-04-14') },
    { id: '3', name: 'Grabación 1', duration: 30, date: new Date('2026-04-15') },
    { id: '4', name: 'Grabación 2', duration: 75, date: new Date('2026-04-14') },
    { id: '5', name: 'Grabación 1', duration: 30, date: new Date('2026-04-15') },
    { id: '6', name: 'Grabación 2', duration: 75, date: new Date('2026-04-14') },
    { id: '7', name: 'Grabación 1', duration: 30, date: new Date('2026-04-15') },
    { id: '8', name: 'Grabación 2', duration: 75, date: new Date('2026-04-14') },
    { id: '9', name: 'Grabación 1', duration: 30, date: new Date('2026-04-15') },
    { id: '10', name: 'Grabación 2', duration: 75, date: new Date('2026-04-14') },
  ])



  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Grabaciones</Text>
        {
          audioList.length > 0
            ? <Pressable style={styles.deleteAllButton}>
                <Text style={styles.buttonText}>🗑️</Text>
              </Pressable>
            : <></>
        }
      </View>
      <FlatList
        data={audioList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AudioCard item={item} />}
        ListEmptyComponent={<Text style={styles.emptyText}>No hay grabaciones</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 7,
    backgroundColor: COLORS.bodyBg,
    padding: 16,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    paddingVertical: 20
  },
  title: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12
  },
  deleteAllButton: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: COLORS.light,
  },
  buttonText: {
    fontSize: 25,
  },
  emptyText: {
    color: COLORS.light,
    textAlign: 'center',
    marginTop: 32,
  },
})