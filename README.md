# 🐍 Snake 2.0

Versión moderna del clásico juego Snake, desarrollada con JavaScript. Este proyecto puede ejecutarse localmente, probado con Jest, y está preparado para Docker.

---

## 📦 Tecnologías utilizadas

- Node.js
- JavaScript
- Jest (para testing)
- Docker (para contenerización)
- ESLint (para calidad de código)

---

## 🚀 Instalación

1. Descrgar o clonar el repositorio:

2. Instala dependencias:
   ```bash
   npm install
   ```

---

## ▶️ Uso

Para ejecutar el juego en modo desarrollo:
```bash
npm start
```

Para ejecutar los tests:
```bash
npm test
```

---

## 🐳 Ejecutar con Docker

1. Construir imagen:
   ```bash
   docker build -t snake2.0 .
   ```

2. Ejecutar contenedor:
   ```bash
   docker run -p 3000:3000 snake2.0
   ```

---

## 🧪 Pruebas

Este proyecto incluye pruebas automatizadas con Jest. Para ejecutarlas:

```bash
npm test
```

Los archivos de prueba se encuentran en la carpeta `__tests__/`.

---

## 🧹 Linting

Para verificar la calidad del código:

```bash
npx eslint .
```
Reglas de codigo aplicadas sobre javascript
---

## 📁 Estructura del proyecto

```
snake/
├── index.js             # Archivo principal (ejecucion del servidor)
├── public/              # Recursos estáticos(html, css y javascript)
├── __tests__/           # Pruebas unitarias
├── package.json         # Configuración del proyecto
├── Dockerfile           # Imagen Docker
└── eslint.config.mjs    # Reglas de estilo
```
---

## ✨ Autor

Desarrollado por Nick Valverde Alejandro Minda – ¡Colaboraciones y mejoras son bienvenidas!
