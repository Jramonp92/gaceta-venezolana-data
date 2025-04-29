# Gaceta Venezolana Data Repository

Este repositorio contiene los datos de la Gaceta Oficial de Venezuela en formato JSON.

## Estructura

- `data/index.json`: índice de fechas a archivos de gaceta.
- `data/tags.json`: listado maestro de tags.
- `data/YYYY/YYYY-MM-DD.json`: archivo por gaceta con campos:
  - `fecha`: fecha en formato `YYYY-MM-DD`.
  - `link`: URL de descarga de la gaceta.
  - `resumen`: descripción breve del contenido.
  - `tags`: array de tags asociados (deben existir en `tags.json`).

- `schema/gazette.schema.json`: JSON Schema para validar archivos de gaceta.
- `schema/tags.schema.json`: JSON Schema para validar `tags.json`.
- `scripts/validate.js`: script en Node.js para validar datos antes de commitear.

## Cómo añadir una nueva gaceta

1. Crear un archivo `data/AAAA/AAAA-MM-DD.json` con la estructura mencionada.
2. Añadir la fecha y ruta en `data/index.json`.
3. Ejecutar:
   ```bash
   node scripts/validate.js
   ```
4. Hacer commit y push:
   ```bash
   git add data schema scripts README.md
   git commit -m "Añadida gaceta AAAA-MM-DD"
   git push
   ```
