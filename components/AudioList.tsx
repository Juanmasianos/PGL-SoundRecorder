import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import { COLORS } from '../styles/colors'
import { AudioItem } from '../types/AudioItem'
import AudioCard from './AudioCard'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AudioListProps {
  audioList: AudioItem[];
  setAudioList: React.Dispatch<React.SetStateAction<AudioItem[]>>;
  onDelete: (uri: string) => void;
  onPlay: (uri: string) => void;
  onStop: () => void;
  playingUri: string | null;
}

export default function AudioList({ audioList, setAudioList, onDelete, onPlay, onStop, playingUri}: AudioListProps) {

  const deleteAll = async () => {
    try {
      await AsyncStorage.removeItem('List_of_audios');
      setAudioList([]);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.listHeader}>
        <Text style={styles.title}>Grabaciones</Text>
        {
          audioList.length > 0
            ? <Pressable style={styles.deleteAllButton} onPress={deleteAll}>
              <Text style={styles.buttonText}>🗑️</Text>
            </Pressable>
            : <></>
        }
      </View>
      <FlatList
        data={audioList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <AudioCard item={item} onDelete={onDelete} onPlay={onPlay} onStop={onStop} playingUri={playingUri} />}
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