# Arduino Uno: fuente y licencia

“Arduino uno micro-controller”, por **benjamino**, publicado el 14 de septiembre de 2020 en [Cad Crowd](https://www.cadcrowd.com/3d-models/arduino-uno). Consultado el 15 de octubre de 2026.

Licencia del modelo: [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/). La página del autor identifica “CC - Attribution” y enlaza esta versión. Conservar esta atribución junto al modelo y en los créditos de las obras que lo incorporen.

El archivo `Arduino_UNO_R3.glb` procede del glTF + BIN accesibles en el visor público del autor. Se conservaron los vértices y triángulos. Cambios: empaquetado GLB autocontenido, retirada de la rotación X de 90° del nodo para usar Y arriba y adición de material gris neutro. No se descargaron los archivos del enlace de cuenta; el visor público basta como fuente de esta geometría.

Los archivos fuente exactos se conservan como `arduino-uno.step.gltf` y `arduino-uno.step.bin`. El sufijo `.step` forma parte del nombre servido por el visor; estos dos archivos son glTF/BIN, no un archivo STEP nativo. `source_viewer.json` registra la URL pública. `source-preview.gif` es la imagen del autor, sin alterar, cuyo enlace está en `source-preview-url.txt`.

La vista del autor corresponde a una placa Uno clásica compatible: microcontrolador DIP, USB-B, jack DC y cuatro cabeceras. El render del autor lleva la marca Geekcreit. Se usa como referencia externa para representar el Arduino Uno R3 del proyecto, no como modelo oficial de Arduino ni como una pieza originalmente diseñada por el equipo.

## Coordenadas para integración

Y arriba; unidades originales en milímetros. Raíz identidad. Envolvente completa: X 53,000 mm × Y 13,000 mm × Z 76,399 mm (incluye voladizos de conectores). Plano inferior de PCB Y=0: X de −42,5988 a 10,4012; Z de −26,3511 a 41,8221. Centro de PCB: (−16,0988; 0; 7,73548). La placa del modelo mide aproximadamente 53 × 68,173 mm; la referencia nominal del Uno es 53,4 × 68,6 mm.

**USB apunta a −Z en el GLB de referencia.** Para que apunte hacia +Z en la escena CNC, rotar 180° sobre Y antes de trasladar el centro de la PCB a su posición. Centrar usando la PCB, no la envolvente completa que incluye el USB.

El archivo `source-license.json` contiene URL exactas, cotas y hash del GLB gris original. Las variantes con nuevos colores o componentes separados deben indicar esos cambios adicionales al reutilizar la atribución.

Atribución breve sugerida: **Arduino Uno, modelo de benjamino / Cad Crowd, CC BY 4.0; adaptado a GLB, orientación y materiales para ARIA.**
