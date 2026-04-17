import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Pressable, ActivityIndicator, Animated } from 'react-native'
import { COLORS } from '../styles/colors'
import { AudioItem } from '../types/AudioItem'
import AudioCard from './AudioCard'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { StorageService } from '../service/StorageService'
import { useRainbow } from './RgbContext'

interface AudioListProps {
  audioList: AudioItem[];
  setAudioList: React.Dispatch<React.SetStateAction<AudioItem[]>>;
  onDelete: (uri: string) => void;
  onPlay: (uri: string) => void;
  onStop: () => void;
  playingUri: string | null;
}

export default function AudioList({ audioList, setAudioList, onDelete, onPlay, onStop, playingUri }: AudioListProps) {

  const [isLoading, setIsLoading] = useState(true);

  const { dynamicColor } = useRainbow();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const deleteAll = async () => {
    try {
      await StorageService.clearAll();
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
          audioList.length > 0 && (
            <Pressable onPress={deleteAll}>
              <Animated.View style={[styles.deleteAllButton, { borderColor: dynamicColor }]}>
                <Text style={styles.buttonText}>🗑️</Text>
              </Animated.View>
            </Pressable>
          )
        }
      </View>
      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.white} />
          <Animated.Text style={[styles.loadingText, { color: dynamicColor }]}>
            Cargando audios...
          </Animated.Text>
        </View>
      ) : (
        <FlatList
          data={audioList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AudioCard
              item={item}
              onDelete={onDelete}
              onPlay={onPlay}
              onStop={onStop}
              playingUri={playingUri}
            />
          )}
          ListEmptyComponent={
            <Animated.Text style={[styles.emptyText, { color: dynamicColor }]}>
              No hay grabaciones
            </Animated.Text>
          }
        />
      )}
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
  },
  buttonText: {
    fontSize: 25,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: COLORS.white,
    marginTop: 10,
    fontSize: 16,
  }
})