# Laverrap - Sistema de Gestión de Lavadero

Sistema completo para la gestión de un negocio de lavado de autos, con panel administrativo y control de servicios, empleados y clientes.

## Características Principales

- **Autenticación**: JWT con roles de usuario
- **Gestión de Empleados**: Registro de horarios de entrada/salida
- **Gestión de Clientes**: Base de datos de clientes y vehículos
- **Catálogo de Servicios**: Crear y gestionar servicios de lavado con precios
- **Registro de Lavados**: Historial completo de servicios realizados
- **Estadísticas**: Dashboard con métricas del negocio
- **Notificaciones**: Sistema de email con Nodemailer

## Stack Tecnológico

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Express.js
- **Base de Datos**: PostgreSQL + Prisma ORM
- **Autenticación**: JWT + Bcrypt
- **Validación**: Zod
- **Email**: Nodemailer

### Frontend
- **Framework**: React 19 + TypeScript
- **Bundler**: Vite
- **Routing**: React Router v7
- **Estado/Datos**: TanStack Query (React Query) + Axios
- **Formularios**: React Hook Form + Zod
- **UI**: Tailwind CSS + Shadcn/ui
- **Gráficos**: Recharts


## Instalación y Configuración

### Backend

```bash
cd laverrap_backend
pnpm install

# Configurar variables de entorno (.env)
# DATABASE_URL=postgresql://...
# PORT=3000
# JWT_SECRET=...

# Migraciones de BD
pnpx prisma migrate dev

# Ejecutar en desarrollo
pnpm dev

# Build para producción
pnpm build && pnpm start
```

### Frontend

```bash
cd laverrap_frontend
pnpm install

# Desarrollo
pnpm dev

# Build
pnpm build

# Preview
pnpm preview
```

## Comandos Útiles

### Backend
```bash
pnpm dev              # Desarrollo con reloads automáticos
pnpm build            # Compilación TypeScript
pnpm lint             # Linting con ESLint
pnpm fix              # Arreglar problemas de linting
pnpm seed             # Ejecutar seed de BD (si existe)
```

### Frontend
```bash
pnpm dev              # Servidor de desarrollo
pnpm build            # Build para producción
pnpm lint             # Linting
pnpm fix              # Arreglar problemas de linting
pnpm preview          # Preview local del build
``


