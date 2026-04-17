import AsyncStorage from '@react-native-async-storage/async-storage';
import { AudioItem } from '../types/AudioItem';

const STORAGE_KEY = 'List_of_audios';

export const StorageService = {
  getAllAudios: async (): Promise<AudioItem[]> => {
    try {
      const storedData = await AsyncStorage.getItem(STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error("Error al obtener audios:", error);
      return [];
    }
  },

  saveAudio: async (newAudio: AudioItem): Promise<AudioItem[]> => {
    try {
      const existingList = await StorageService.getAllAudios();
      const updatedList = [newAudio, ...existingList];
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return updatedList;
    } catch (error) {
      console.error("Error al guardar audio:", error);
      throw error;
    }
  },

  deleteAudio: async (id: string): Promise<AudioItem[]> => {
    try {
      const existingList = await StorageService.getAllAudios();
      const updatedList = existingList.filter(item => item.id !== id);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedList));
      return updatedList;
    } catch (error) {
      console.error("Error al borrar audio:", error);
      return [];
    }
  },

  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error("Error al limpiar storage:", error);
    }
  }
};