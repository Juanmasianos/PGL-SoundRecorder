import { AudioModule, AudioPlayer, createAudioPlayer, setAudioModeAsync } from 'expo-audio';
import { useState } from 'react';
import { Alert } from 'react-native';



export function useAudioPlayer() {
  const [activePlayer, setActivePlayer] = useState<AudioPlayer | null>(null);
  const [playingUri, setPlayingUri] = useState<string | null>(null);

  const playAudio = (uri: string) => {
    if (activePlayer) {
      activePlayer.pause();
      activePlayer.release();
    }

    try {
      const player = createAudioPlayer(uri);

      player.addListener('playbackStatusUpdate', (status: { didJustFinish: boolean }) => {
        if (status.didJustFinish) {
          setActivePlayer(null);
          setPlayingUri(null);
        }
      });

      player.play();
      setActivePlayer(player);
      setPlayingUri(uri);
    } catch (error) {
      console.error("Error al reproducir:", error);
    }
  };

  const stopAudio = () => {
    if (activePlayer) {
      activePlayer.pause();
      activePlayer.release();
      setActivePlayer(null);
      setPlayingUri(null);
    }
  };

  return { playAudio, stopAudio, playingUri };
}