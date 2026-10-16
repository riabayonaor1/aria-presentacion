# ARIA · Presentación inmersiva

Ejecuta `ABRIR_PRESENTACION.command` con doble clic, o desde la carpeta superior `sustentacion_aria_2026-10-15`, ejecuta `python3 -m http.server 8790 --bind 127.0.0.1` y abre http://127.0.0.1:8790/inmersiva/ . Se necesita servidor local por las restricciones de módulos del navegador.

← / → avanzan; I abre capítulos; G muestra guion; F activa pantalla completa; E permite girar/acercar/seleccionar la mecánica; D abre un despiece visual. Escape cierra el diálogo o la exploración. Arrastrar gira y la rueda acerca durante Explorar.

Es una presentación local con navegación por capítulos y cámara continua, basada en el formato de referencia JaqueBot. No controla el robot ni llama APIs. La mecánica procede del ensamblaje de Autodesk Fusion. El visor está adaptado al controlador real del proyecto: Arduino UNO R3. Incluye 536 mallas en 23 subconjuntos, con 160.132 triángulos. Se puede descargar el modelo completo en `assets/model/ARIA_CNC_Pantalla_Raspberry_Enfriador.glb`. Los materiales de presentación y la opacidad sólida permiten distinguir los componentes. El despiece mantiene unidas las partes de cada placa y motor y no simula movimiento físico. La procedencia y la atribución de la placa Uno se documentan en `assets/model/model-info.json`.

Marca y medios incorporados por el equipo. Fuentes generales y guion completo en la carpeta superior. Video final de tres minutos con narración sintética en español y música instrumental en la lámina16. Voz Veronica de ElevenLabs con Eleven Multilingual v2; música original de ElevenMusic v2 creada para JaqueBot y reutilizada con autorización del mismo usuario, a volumen bajo y con fundidos.

El enfoque cambia automáticamente con cada capítulo. También hay botones Conjunto, Motores, Controlador, ULN2003, Rieles y Portalápiz. Motores ofrece tres selecciones. Una transición de cámara acerca el componente y marca su contorno, conservando el conjunto sólido. Volver a un capítulo abandona la exploración libre y recupera su vista temática. El cierre regresa al conjunto.

## Compatibilidad del recorrido

Preparado para Chrome, Edge, Firefox y Safari actuales. Se eliminaron los mapas de importación y las dependencias de Internet: los módulos, fuentes, imágenes y el modelo se cargan desde esta misma carpeta. Las transiciones usan requestAnimationFrame y los controles funcionan con ratón, teclado y gestos táctiles. El recorrido respeta la preferencia del sistema «reducir movimiento» y pausa el render 3D cuando la pestaña está oculta.

El 3D interactivo necesita WebGL 2 y aceleración gráfica disponible. Si el equipo o navegador no lo activa, aparece una imagen sólida del modelo; capítulos, guiones, presupuesto y video siguen disponibles. La pantalla completa usa la API estándar o su alternativa de Safari; el botón se oculta donde el navegador no la ofrece. En versiones muy antiguas se puede consultar el PDF.

Verificación realizada en Chrome 155, Firefox 153 y Safari 27 de macOS. Chrome y Firefox cubrieron carga 3D, focos, despiece, guiones y vista de reserva; Safari se comprobó manualmente con carga, modelo sólido y transición de motores a Arduino UNO R3. Edge y teléfonos físicos no se ejecutaron en este equipo; no se afirma una prueba en todas las versiones y dispositivos.


Actualización 16/10/2026: incluye soporte de los STL aportados, pantalla con rostro y Raspberry con enfriador de torre y ventilador lateral, reconstruidos a partir del video. Las dimensiones de la electrónica son aproximadas; el soporte conserva su geometría. Se coloca como conjunto de mesa junto a la CNC. El guion usa seis roles genéricos y explica los términos dentro de cada intervención.
