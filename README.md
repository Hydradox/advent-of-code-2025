# 🎄 Advent of Code 2025 🎅

¡Bienvenido a mi repositorio de soluciones para el **Advent of Code 2025**! 🎁

Este proyecto contiene mis implementaciones de los desafíos de programación del evento, escritas en TypeScript ☕✨

## 🚀 Instalación

Primero, instala las dependencias del proyecto:

```bash
# Con Bun (recomendado) 🐰
bun install

# O con npm 📦
npm install

# O con yarn 🧶
yarn install
```

## 🎯 Ejecución de Challenges

Para ejecutar un desafío específico, usa el siguiente comando con el parámetro `challenge`:

### Con Bun 🐰

```bash
bun run src/index.ts challenge=day-01
```

### Con Node.js 🟢

```bash
# Usando tsx (recomendado para TypeScript)
npx tsx src/index.ts challenge=day-01

# O compilando primero
npx tsc
node dist/index.js challenge=day-01
```

### Con Deno 🦕

```bash
deno run --allow-read src/index.ts challenge=day-01
```

## 🎨 Cómo Añadir un Nuevo Challenge

1. Crea una nueva carpeta en `src/challenges/` con el nombre del día:
   ```bash
   mkdir src/challenges/day-XX
   ```

2. Crea un archivo `index.ts` dentro con tu solución:
   ```typescript
   // src/challenges/day-XX/index.ts
   console.log('🎄 ¡Resolviendo el día XX!');

   // Tu código aquí...
   ```

3. Ejecuta tu challenge:
   ```bash
   bun run src/index.ts challenge=day-XX
   ```

## 🛠️ Scripts Disponibles

```bash
# Ejecutar en modo desarrollo con watch 👀
bun run dev

# Linter y formateo 🧹
bun run lint
```

## 📝 Notas

- 🎯 El parámetro `challenge` es **obligatorio** al ejecutar el proyecto
- 📂 Los challenges deben estar en la carpeta `src/challenges/<nombre>/index.ts`
