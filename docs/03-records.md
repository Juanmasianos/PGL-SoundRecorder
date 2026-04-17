# Implementación de expo-audio

Este documento resume brevemente el uso de la librería para las funciones de grabación y reproducción.

## 1. Grabación (Recording)
Se gestiona a través de los hooks de instancia y estado:

* **`useAudioRecorder`**: Inicializa el grabador con presets de calidad (e.g., `HIGH_QUALITY`).
* **`prepareToRecordAsync()`**: Prepara el hardware antes de capturar audio.
* **`audioRecorder.record() / stop()`**: Controlan el inicio y fin de la captura.
* **`useAudioRecorderState`**: Proporciona el estado reactivo (`isRecording`) y la duración (`durationMillis`) para la UI.

## 2. Reproducción (Playback)
Se maneja mediante la creación de instancias de reproducción dinámicas:

* **`createAudioPlayer(uri)`**: Crea un objeto de audio a partir de la ruta del archivo.
* **`player.play()`**: Inicia la salida de sonido.
* **`playbackStatusUpdate`**: Listener utilizado para detectar cuando el audio termina (`didJustFinish`) y limpiar el estado.
* **`player.release()`**: Método clave para liberar memoria y recursos del sistema al detener la reproducción.

## 3. Flujo de Datos
1.  **Captura**: El `uri` se obtiene del grabador tras `stop()`.
2.  **Persistencia**: Se genera un objeto `AudioItem` con el `uri` y metadatos para almacenamiento.
3.  **Estado**: Se sincronizan los estados de grabación y reproducción con el componente padre mediante `useEffect`.