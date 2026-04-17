# Documentación: Animaciones de Carga y Feedback Visual

Este documento describe cómo se implementaron las animaciones y los indicadores de estado para mejorar la experiencia de usuario (UX) durante procesos asíncronos.

---

## 1. Loader de Bienvenida (AudioList)
El componente `AudioList` utiliza un estado de carga inicial para gestionar la entrada de los datos.

- **Lógica:** Se utiliza un `setTimeout` de 3000ms dentro de un `useEffect` para simular la carga de datos y dar espacio a que se vea la animacion vaya.
- **Componentes:**
    - `ActivityIndicator`: Un spinner nativo para indicar actividad.
    - `Animated.Text`: El texto "Cargando audios..." está vinculado a un sistema de colores dinámicos.

## 2. Overlay de Guardado (Recorder)
Para evitar que el usuario interactúe con la app mientras se procesa y guarda el archivo de audio, se implementó un bloqueo visual.

- **Componente:** `fullScreenOverlay`.
- **Interacción:** Aparece cuando el estado `isSaving` es `true`. 
- **Estilo:** Un fondo semi-transparente que cubre toda la pantalla con un `ActivityIndicator` central y un mensaje de "Guardando grabación...".
- **Finalización:** Se limpia automáticamente después de 3 segundos mediante un timer para asegurar que la transición a la lista actualizada sea fluida.