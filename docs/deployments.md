# Entornos desplegados de Zest

## Frontend de producción — Vercel (ZEST-102)

- URL de producción: <https://zest-frontend-five.vercel.app>.
- Dashboard: <https://vercel.com/zest20/zest-frontend>.
- Equipo de Vercel: `Zest` (`zest20`).
- Proyecto: `zest-frontend`.
- Repositorio: <https://github.com/proyecto-zest/zest>.

| Configuración | Valor |
|---|---|
| Rama de producción | `main` |
| Root Directory | `frontend` |
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Node.js | `24.x` |

El primer despliegue se verificó el 7 de octubre de 2026 con estado **Ready**, sobre el commit `d2add6d138f13e9093a15e2cfc3919db664fe652` de `main`.

La URL anterior es el dominio de producción del proyecto. Las URLs generadas para cada despliegue son distintas. Los cambios que estén únicamente en `dev` no se publican en producción hasta incorporarse a `main`.

Este documento contiene solo configuración pública, sin credenciales ni secretos. Las variables de entorno se configuran en Vercel, no mediante un `.env` real versionado.

### Alcances siguientes

- **ZEST-78:** configurar las variables del frontend y actualizar `.env.example`.
- **ZEST-80:** verificar deploys automáticos y previews, agregar el rewrite de SPA y configurar CORS para los orígenes correspondientes.

El estado **Ready** confirma que el frontend compiló y se desplegó; no reemplaza la verificación de su conexión con la API o de la autenticación.
