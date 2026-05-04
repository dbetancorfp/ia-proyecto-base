Añade un nuevo handler IPC al proyecto siguiendo la arquitectura establecida.

Descripción de lo que debe hacer: $ARGUMENTS

Pasos a seguir:
1. Si necesita acceso a datos, añade el método en el Repository correspondiente (`src/main/repositories/`) o crea uno nuevo
2. Si llama a la API de Moodle, añade el método en `src/main/services/MoodleService.ts`
3. Registra el handler en `src/main/ipc/handlers.ts` con el naming `dominio:accion` (ej: `db:getNotas`, `moodle:getCalendario`)
4. Expón el método en `src/preload/index.ts` dentro del objeto `api` correspondiente
5. Añade el tipo en la interfaz `ElectronAPI` de `src/shared/types.ts`

Muestra todos los archivos modificados y un ejemplo de uso desde un componente Lit (`window.api.dominio.accion(...)`).
