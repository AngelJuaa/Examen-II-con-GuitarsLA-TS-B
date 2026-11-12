# GuitarsLA (Frontend)

Tienda de guitarras hecha con React + TypeScript + Vite. El catálogo se consume desde la API de GuitarsLA y permite registrar nuevas guitarras.

## Requisitos
- Node.js 18 o superior
- El backend de GuitarsLA corriendo (ver el README del proyecto `PERN`)

## 1. Instalar dependencias
```bash
npm install
```

## 2. Configurar variables de entorno
Crea un archivo `.env` en la raíz (puedes copiar `.env.example`):

```env
VITE_API_URL=http://localhost:4002
```

`VITE_API_URL` es la URL del backend. Si no se define, usa `http://localhost:4002`.

## 3. Arrancar el servidor de desarrollo
```bash
npm run dev
```
Abre `http://localhost:5173`.

> Levanta primero el backend y después el frontend. El backend debe permitir el origen `http://localhost:5173` en su variable `FRONTEND_URL`.

## Scripts
| Comando           | Descripción                          |
|-------------------|--------------------------------------|
| `npm run dev`     | Servidor de desarrollo               |
| `npm run build`   | Compila TypeScript y genera `dist/`  |
| `npm run preview` | Previsualiza el build                |
| `npm run lint`    | Ejecuta ESLint                       |

## Funcionalidades
- **Catálogo (Read):** lista las guitarras desde `GET /api/guitars`, con estados de carga y error.
- **Formulario (Create):** envía `POST /api/guitars` con validaciones en el cliente (campos vacíos, precio no numérico o menor o igual a 0) y muestra los errores del servidor.
- **Carrito:** agregar, quitar, cambiar cantidades y vaciar, guardado en `localStorage`.

## Estructura
```
src/
├── api/guitars.ts            # Llamadas fetch a la API
├── components/
│   ├── Guitar.tsx
│   ├── GuitarForm.tsx
│   └── Header.tsx
├── hooks/useCart.ts          # Catálogo + carrito
├── App.tsx
└── types.d.ts
```
