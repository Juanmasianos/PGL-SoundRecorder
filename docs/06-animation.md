# Documentación del Sistema de Animación RGB

La aplicación utiliza un sistema de animación centralizado para crear un efecto visual de "Arcoíris Neón" que se sincroniza con el estado de la aplicación (grabación o reproducción de audio).

## 1. El Motor: `useRainbowAnimation`

La lógica reside en un Hook personalizado que gestiona el ciclo de vida de la animación utilizando la API `Animated` de React Native.

* **Valor Animado:** Se utiliza un `useRef(new Animated.Value(0))` para mantener una referencia persistente de la progresión (de 0 a 1).
* **Loop Infinito:** Cuando el estado `isActive` es verdadero, se dispara un `Animated.loop` con un `timing` de 4000ms y un `Easing.linear` para asegurar una transición de color constante y sin saltos.
* **Interpolación de Color:** Transformamos el valor numérico (0-1) en una cadena de colores hexadecimales:
    ```javascript
    inputRange: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1],
    outputRange: [COLORS.light, '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff', COLORS.light]
    ```

## 2. El Distribuidor: `RgbProvider`

Para evitar que cada componente gestione su propia animación (lo que consumiría recursos excesivos y desincronizaría los colores), utilizamos un **Contexto de React**.

- **Estado Global:** El Provider recibe la prop `isActive` (calculada como `isRecording || isPlaying`).
- **Lógica de Decisión:** Si `isActive` es falso, el contexto entrega el color estático `COLORS.light`. Si es verdadero, entrega el valor animado generado por el hook.
- **Rendimiento:** Al centralizar la animación, todos los componentes de la app (Neones, Botones, Tarjetas) brillan exactamente con el mismo color al mismo tiempo.

## 3. Consumo en Componentes (`Animated.View`)

Para que los componentes puedan renderizar un color que cambia 60 veces por segundo sin bloquear el hilo principal, se aplicaron las siguientes reglas:

1.  **Uso de `Animated.View` y `Animated.Text`:** Los componentes estándar de React Native no aceptan valores interpolados directamente en sus estilos.
2.  **Mapeo de Estilos:**
    ```javascript
    const { dynamicColor } = useRainbow();
    // ...
    <Animated.View style={{ borderColor: dynamicColor }} />
    ```
3.  **Capas de Brillo (Glow):** En el componente `NeonLight`, se apilaron múltiples `Animated.View` con diferentes opacidades y grosores, todos vinculados al mismo `dynamicColor`, simulando la dispersión de luz de un tubo de neón real.

## 4. Comportamiento Esperado

- **Reposo:** La interfaz mantiene un color sólido definido en el sistema de diseño.
- **Actividad:** Al detectar entrada (micrófono) o salida (altavoz), el `Animated.Value` comienza su transición, recorriendo el espectro cromático completo cada 4 segundos.