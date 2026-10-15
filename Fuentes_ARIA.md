# Fuentes de la sustentación ARIA

Consulta y preparación: 15 de octubre de 2026, Colombia.

## Guía y material aportado

- Guía de sustentación de proyectos productivos SENA, I.E. Carlos Julio Torrado Peñaranda. Estructura aplicada: seis roles, 12 minutos de exposición con demostración, 3 minutos de video y 5 minutos de preguntas.
- Fotografías IMG_8604 a IMG_8623 y IMG_8874 a IMG_8876, más la foto JPG aportada: montaje CNC, Arduino Uno, drivers y prototipo con cabeza.
- Videos IMG_8868 a IMG_8942: montaje e interacción real en el aula. El archivo v26044gc0000d8i8fpfog65qjmfrq5m0.MP4 es una referencia de diseño de página web y se excluyó como evidencia de ARIA.
- Logos SENA e institución: imágenes aportadas en la guía y archivos transparentes de la presentación de referencia del brazo robótico. Conservan su diseño, colores y proporciones.

## Modelo y software

- Autodesk Fusion: diseño guardado EnsamblajeCNCARIA, abierto y capturado el 15 de octubre. Captura nativa en assets/fusion_actual/fusion_cnc_actual.png.
- Exportación del diseño activo: 620 cuerpos visibles, 107.088 triángulos, ningún cuerpo omitido; tolerancia de teselación 0,12 mm. La mecánica conserva su geometría de origen. El visor usa materiales de presentación y electrónica adaptada al Arduino Uno R3 del prototipo. Esta tolerancia describe la malla base exportada, no la precisión del robot. Fuente: assets/fusion_actual/export-report.json.
- Modelo original Simple CNC, de mith: https://www.thingiverse.com/thing:4796222 . Deriva del diseño de DAZ: https://www.thingiverse.com/thing:4579436 . La licencia local indica Creative Commons Attribution; no se asigna versión que no conste en ese archivo.
- Archivos originales: ARIA_CNC_actual_2026-09-07/01_modelo_original/files/Simple_CNC.f3z y piezas STL.
- Documentación actual: aria_raspberry/CNC_OPERACION_POR_VOZ.md, aria_raspberry/CNC_TEXTO_DIBUJOS_FUNCIONES.md, aria_raspberry/MOVIL.md y LEEME.md.
- Evidencia reciente: work/aria_alarm9_20261014/final-validation.json, measurement-r6-validation.json, diagnosis.json y firmware_r6/VALIDATION.md. Los registros documentan pruebas y movimiento sin lápiz. El contacto del lápiz con el papel no consta confirmado.
- Referencia visual: presentación local del proyecto del brazo robótico. ARIA conserva el recorrido por capítulos y el modelo interactivo, con una identidad de color propia.

## Presupuesto

Las cifras son referencias de reposición y reservas de planeación. No constituyen facturas ni compras realizadas. El monto solicitado para cada proveedor de IA es USD10. La impresión presupone una impresora disponible y compra de rollo PLA completo; el consumo real requiere masa y tiempo del laminador.

- [S1 · Servotronik — Motor 28BYJ-48 + ULN2003](https://servotronik.com.co/tienda/motores-y-servomotores/motor-paso-a-paso-28byj-48-uln2003/). COP 17.000 por kit; 17 disponibles al consultar. Consulta: 2026-10-15.
- [S2 · Vistronica — Arduino UNO R3 CH340 con cable USB](https://www.vistronica.com/board-de-desarrollo/arduino/board/arduino-uno-r3-con-ch340-detail.html). COP 20.230; referencia VIS913; 26 unidades. Consulta: 2026-10-15.
- [S3 · Electronilab — Raspberry Pi 4 Modelo B 4GB](https://electronilab.co/tienda/raspberry-pi-4-modelo-b-4gb-ram/). COP 549.900; IVA incluido; últimas 2 unidades. Consulta: 2026-10-15.
- [S4 · Vistronica — Dupont hembra-macho x40 20 cm](https://www.vistronica.com/conectores-cables-y-switches/cable-dupont-hembra-macho-detail.html). COP 6.545 por tira de 40; compra internacional/20 días hábiles en la ficha. Consulta: 2026-10-15.
- [S5 · Vistronica — Dupont macho-macho x40 20 cm](https://www.vistronica.com/conectores-cables-y-switches/cable-dupont-macho-macho-x40-20-cm-detail.html). COP 6.010 por tira de 40. Consulta: 2026-10-15.
- [S6 · Impresión 3D Soluciones — Filamento PLA](https://impresion3dsoluciones.com/products/filamento-pla). COP 70.000 por rollo; envío nacional indicado COP 22.900. El cálculo de la tienda usa COP70.000/kg. Consulta: 2026-10-15.
- [S7 · Impresión 3D Soluciones — Calculadora de costos](https://impresion3dsoluciones.com/pages/calculadora-impresion-3d). Explica separar material, energía, desgaste, preparación y fallas; ejemplo PLA COP70.000/kg. Masa y horas reales deben salir del laminador. Consulta: 2026-10-15.
- [S8 · SFC / Datos Abiertos — TRM histórico, API JSON](https://www.datos.gov.co/resource/mcec-87by.json). valor 3197.65 COP; vigenciadesde y vigenciahasta 2026-10-15. Consulta: 2026-10-15.
- [S9 · OpenAI Platform — API billing overview](https://platform.openai.com/settings/organization/billing/overview). Página oficial de facturación de API; requiere sesión para datos de la cuenta. USD10 es el monto de recarga solicitado, no una factura comprobada. Consulta: 2026-10-15.
- [S10 · ElevenLabs — Pay As You Go](https://elevenlabs.io/docs/overview/administration/pay-as-you-go). Recargas PAYG disponibles en planes self-serve incluido Free; mínimo USD5; se puede prepagar sin suscripción mensual. Consulta: 2026-10-15.
- [S11 · Vistronica — Adaptador Raspberry Pi 4 USB-C 5V 3A](https://www.vistronica.com/fuente-de-voltaje/fuente-de-alimentacion-usb-c-para-raspberry-pi-4-con-interruptor-detail.html). COP31.357; sin stock/en camino, llegada estimada 16/10/2026 en ficha. Consulta: 2026-10-15.
- [S12 · Servotronik — Fuente 5V 2A](https://servotronik.com.co/tienda/miscelaneos/fuente-5v-2a/). COP18.600; una disponible al consultar. Consulta: 2026-10-15.
- [S13 · Vistronica — Protoboard MB102 830 puntos](https://www.vistronica.com/conectores-cables-y-switches/placas-universales/protoboard/protoboard-mb102-830-puntos-detail.html). COP14.221; 29 disponibles en ficha. Consulta: 2026-10-15.
- [S14 · Electronilab — MicroSD SanDisk Ultra 32GB](https://electronilab.co/tienda/memoria-micro-sd-32gb-sandisk-ultra-uhi-iclase-10-80mbs-adaptador/). COP69.500; IVA incluido; agotada, referencia comparativa. Consulta: 2026-10-15.
- [S15 · Servotronik — Final de carrera 10A sin lengüeta](https://servotronik.com.co/tienda/miscelaneos/final-de-carrera-10amp-sin-lengueta/). COP2.000 por unidad; 7 disponibles. No sumado al total: falta confirmar cantidad y geometría definitivas. Consulta: 2026-10-15.
- [S16 · Vistronica — Tornillo avellanado Allen M3x10](https://www.vistronica.com/herramientas/tornilleria-/tornillo-allen-cabeza-avellanada-m3x10-mm-detail.html). COP179 por unidad; 408 disponibles. No es lista de tornillos del modelo, solo referencia de precio. Consulta: 2026-10-15.

## Arduino Uno R3 y adaptación del modelo

El equipo confirmó Arduino Uno R3. La presentación sustituye la electrónica de referencia del CAD por una geometría Uno compatible y conserva la mecánica de la CNC. Los materiales del visor cambian el contraste para reconocer las piezas; los enfoques ya no hacen transparente el conjunto.

Modelo 3D de Arduino Uno: [benjamino en Cad Crowd](https://www.cadcrowd.com/3d-models/arduino-uno), bajo [Creative Commons Attribution 4.0](https://creativecommons.org/licenses/by/4.0/). Adaptaciones: empaquetado GLB, orientación y materiales de presentación. Se identifican puerto USB tipo B, jack, cabeceras y encapsulado DIP. Atribución completa en assets/arduino_uno_r3/FUENTE_Y_LICENCIA.md.

## Identidad ARIA

Slogan: **Tu voz toma forma**.

Símbolo original generado mediante la herramienta integrada de imagen. Concepto: rostro amable integrado con rieles cartesianos y una punta de escritura. Paleta: turquesa #087F8C, coral #ED765E, fondo #F4F7F6 y texto #132B32. Prompt guardado en identidad/Prompt_logo.txt.

## Audio del videoclip

El videoclip de 180 segundos incluye narración sintética en español latino con la voz **Veronica** de ElevenLabs y el modelo **Eleven Multilingual v2** (`eleven_multilingual_v2`). Esta locución se añadió a la edición audiovisual y no corresponde al sonido capturado del robot durante las tomas.

La música instrumental original se generó con **ElevenMusic v2** para el proyecto JaqueBot. Se reutiliza en ARIA con autorización expresa del mismo usuario, a volumen bajo y con fundidos de entrada y salida para acompañar la narración. Las fotografías, los videos del proceso y la duración del montaje se conservan.

## Alcance de la evidencia

El prompt de programación es un ejemplo reproducible, no una captura histórica. La guía propone Gemini para programación asistida; el funcionamiento verificado de ARIA usa OpenAI y ElevenLabs. El video muestra montaje, pantalla y pruebas reales. No atribuye escritura sobre papel ni incidentes físicos específicos que no estén registrados. La accesibilidad y el impacto son objetivos por evaluar con usuarios.
