# ARIA · Tu voz toma forma

Presentación de sustentación SENA de un asistente de voz y rostro expresivo con CNC de escritura. I. E. Carlos Julio Torrado Peñaranda, 2026.

## Ver la presentación

- Sites: https://aria-cnc-sustentacion-2026.rickynovich32.chatgpt.site
- Archivos: https://github.com/riabayonaor1/aria-presentacion/releases/tag/sustentacion-2026-10-15

El sitio arranca en `dist/index.html` y conserva la presentación en `dist/inmersiva/`. El modelo completo tiene 316 mallas en 18 grupos y representa la mecánica de Fusion con electrónica adaptada a Arduino Uno R3. Las superficies son sólidas y la cámara enfoca motores, controlador, ULN2003, rieles y portalápiz.

## Uso local

Ejecutar `python3 -m http.server 8791 --directory dist --bind 127.0.0.1` y abrir http://127.0.0.1:8791/. No requiere instalar paquetes ni llamar APIs.

Flechas: capítulos. G: guion. I: índice. F: pantalla completa cuando está disponible. E: explorar. D: despiece.

Probado en Chrome 155, Firefox 153 y Safari 27 para macOS. El 3D necesita WebGL 2; si no está disponible, la presentación conserva una imagen del modelo y permite continuar. Respeta la preferencia de movimiento reducido.

## Descargas

El PDF, los guiones, el presupuesto y las fuentes se sirven con el sitio. El PowerPoint editable, el video original 1080p y el ZIP completo se conservan en GitHub Releases. Para reproducción web se incluye una versión 720p del mismo video de 180 segundos, ahora con narración sintética en español latino y música instrumental.

## Audio del video

Narración sintética con la voz Veronica de ElevenLabs y el modelo Eleven Multilingual v2. Música instrumental original de ElevenMusic v2, creada para JaqueBot y reutilizada con autorización del mismo usuario. La música acompaña a volumen bajo y con fundidos. Los créditos completos están en `dist/Fuentes_ARIA.md`.

## Evidencia y atribución

Las pruebas de escritura documentadas incluyen un ensayo sin lápiz: el trazo físico sobre papel aún requiere evaluación. El despiece es explicativo. La presentación no controla el robot ni contiene credenciales API.

Modelo mecánico basado en Simple CNC Plotter de mith y el ensamblaje del proyecto en Autodesk Fusion. Placa Uno R3 adaptada desde el modelo de benjamino (Cad Crowd), CC BY 4.0. Detalle en `dist/inmersiva/assets/model/UNO_FUENTE_Y_LICENCIA.md`, `model-info.json` y `dist/Fuentes_ARIA.md`. Three.js conserva su licencia MIT. Marca ARIA creada para el proyecto; logos institucionales utilizados para identificar la sustentación.
