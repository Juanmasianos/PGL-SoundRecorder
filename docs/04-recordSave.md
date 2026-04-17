

## Persistencia con `AsyncStorage`

La persistencia se maneja a través de un `StorageService` que centraliza las operaciones CRUD sobre el almacenamiento local del dispositivo.

### Modelo de Datos (AudioItem)
```typescript
{
  id: string,        // Timestamp único (Date.now())
  name: string,      // Nombre asignado por el usuario
  duration: number,  // Duración en segundos
  date: Date,        // Fecha de creación
  uri: string        // Ruta local del archivo de audio
}