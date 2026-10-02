# Órbita

Órbita es una página estática de estudio para matemáticas y química. La práctica,
las misiones, las notas y la calculadora funcionan en el navegador; el progreso
se guarda localmente. La sincronización con Google ya está configurada para el
proyecto Firebase de esta app y es opcional: solo se activa al iniciar sesión.

Los módulos PDF originales se publican como recursos descargables en la
[versión modulos-2021](https://github.com/devcarlos-code/orbita-estudio/releases/tag/modulos-2021)
y están enlazados desde la sección Teoría de GitHub Pages.

Órbita también se puede instalar como aplicación web progresiva (PWA) desde
GitHub Pages o desde un servidor local seguro. En Android y en navegadores de
escritorio compatibles, usa el botón de instalación de la barra superior o la
opción **Instalar aplicación** del navegador. En iPhone y iPad, abre la página
en Safari, pulsa **Compartir** y elige **Añadir a pantalla de inicio**. Después
de abrir la página una vez con conexión, la interfaz y los ejercicios quedan
disponibles sin conexión; el inicio de sesión de Google y la sincronización
requieren internet.

Cada tema ofrece un taller práctico, ejercicios de selección múltiple y
verdadero/falso, además de los formatos de práctica originales. La ruta de
misiones registra experiencia y rachas; un tema se completa con al menos tres
respuestas y un 80 % de aciertos. Los sonidos son opcionales y empiezan
desactivados. El temporizador Pomodoro, la calculadora y los apuntes están en
Herramientas; los apuntes solo se guardan en el dispositivo.

## Ejecutar localmente

Desde esta carpeta, inicia un servidor HTTP local:

```powershell
python -m http.server 8000
```

Abre `http://localhost:8000`. No abras `index.html` directamente con `file://`:
los navegadores bloquean el acceso de Google y Firebase para archivos locales.

## Inicio de sesión con Google y sincronización

La app web ya está vinculada al proyecto Firebase `orbita-quimica-matematicas`.
El proveedor Google está habilitado, `localhost` está autorizado y Cloud
Firestore ya está creado en `us-east1` (Carolina del Sur), en modo seguro. Las
reglas publicadas son las de `firestore.rules`: cada cuenta solo puede leer,
crear, actualizar o borrar sus propias sesiones válidas.

Para probar Órbita localmente, inicia el servidor HTTP de arriba y abre
`http://localhost:8000`. Para publicar la web:

1. Sirve el sitio por HTTPS.
2. En Firebase Console → Authentication → Configuración → Dominios autorizados,
   agrega el dominio exacto donde publicarás la página.
3. Si modificas `firestore.rules`, vuelve a publicarlas en la pestaña Reglas de
   Cloud Firestore o mediante Firebase CLI.

La publicación de GitHub Pages está disponible en
`https://devcarlos-code.github.io/orbita-estudio/`. Para que Google Auth funcione
allí, autoriza el dominio `devcarlos-code.github.io` en Firebase Authentication.

`firebase-config.js` contiene los identificadores públicos de configuración web
que el SDK de Firebase necesita en el navegador; no contiene claves privadas.
Nunca pongas en la página una clave privada de Firebase Admin SDK, una cuenta de
servicio ni otras credenciales secretas. Si el acceso falla, comprueba que la
página se abra por HTTP(S), el dominio autorizado y la conexión a Firebase.

Las sesiones se almacenan en la ruta privada
`users/{uid}/sessions/{sessionId}`; las reglas permiten leerlas, crearlas,
actualizarlas y borrarlas únicamente a la persona autenticada propietaria. Al iniciar sesión, se combina
el historial local con el guardado en la nube. Usa
**Borrar mi progreso** para eliminar el historial del dispositivo y, si has
iniciado sesión, también el historial en tu cuenta. Los apuntes rápidos se
conservan únicamente en el dispositivo. `firebase-config.js` contiene
exclusivamente valores públicos de la configuración web; no añadas allí
credenciales privadas.

La sección **Perfil** muestra los datos que Google comparte con la app (nombre,
correo, foto, estado de verificación y fechas de la sesión), el identificador
de Firebase y el resumen de progreso. Esos datos personales son de solo lectura
en Órbita; no se solicitan contraseñas.

La cuenta y el proyecto Firebase pertenecen al usuario. Revisa las cuotas y
condiciones vigentes del plan Spark antes de ampliar el uso del servicio.
