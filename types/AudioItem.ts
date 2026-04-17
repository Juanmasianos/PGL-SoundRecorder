export type AudioItem = {

  id: string
  name: string
  duration: number
  date: Date | string
  uri: string
}
export const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  
  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');
  
  return `${mm}:${ss}`;
};