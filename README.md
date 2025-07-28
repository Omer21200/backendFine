# BackendFine

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## Descripción

BackendFine es una aplicación backend desarrollada con [NestJS](https://github.com/nestjs/nest), un framework progresivo de Node.js para construir aplicaciones del lado del servidor eficientes y escalables.

Este proyecto incluye:
- Autenticación JWT
- Gestión de usuarios y docentes
- CRUD completo para aulas, clases y programas
- Sistema de asignación automática de horarios
- Integración con Supabase como base de datos
- Vistas de base de datos para dashboards
- API RESTful completa

## Tecnologías Utilizadas

### Dependencias Principales
- **@nestjs/common**: ^11.0.1
- **@nestjs/core**: ^11.0.1
- **@nestjs/jwt**: ^11.0.0
- **@nestjs/platform-express**: ^11.0.1
- **@supabase/supabase-js**: ^2.50.0
- **class-transformer**: ^0.5.1
- **class-validator**: ^0.14.2
- **dotenv**: ^16.5.0
- **jsonwebtoken**: ^9.0.2
- **reflect-metadata**: ^0.2.2
- **rxjs**: ^7.8.1

### Dependencias de Desarrollo
- **@nestjs/cli**: ^11.0.0
- **@nestjs/testing**: ^11.0.1
- **@types/node**: ^22.10.7
- **typescript**: ^5.7.3
- **jest**: ^29.7.0
- **eslint**: ^9.18.0
- **prettier**: ^3.4.2

## Configuración del Proyecto

### Instalación de Dependencias

```bash
npm install
```

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
SUPABASE_URL=tu_url_de_supabase
SUPABASE_ANON_KEY=tu_clave_anonima_de_supabase
JWT_SECRET=tu_secreto_jwt
```

## Ejecución del Proyecto

### Desarrollo
```bash
# Modo desarrollo
npm run start

# Modo watch (recomendado para desarrollo)
npm run start:dev

# Modo debug
npm run start:debug
```

### Producción
```bash
# Compilar
npm run build

# Ejecutar en producción
npm run start:prod
```

## Pruebas

```bash
# Pruebas unitarias
npm run test

# Pruebas en modo watch
npm run test:watch

# Cobertura de pruebas
npm run test:cov

# Pruebas end-to-end
npm run test:e2e
```

## Estructura del Proyecto

```
src/
├── auth/           # Autenticación JWT
├── usuario/        # Gestión de usuarios
├── docente/        # Gestión de docentes
├── aula/           # CRUD de aulas
├── clase/          # CRUD de clases
├── programas/      # Gestión de programas
├── catalogo/       # Catálogos del sistema
├── dashboard/      # Estadísticas del dashboard
├── vistas/         # Vistas de base de datos
├── asignacion/     # Algoritmo de asignación
├── supabase/       # Cliente de Supabase
└── utils/          # Utilidades
```

## API Endpoints

### Autenticación
- `POST /auth/login` - Iniciar sesión

### Usuarios
- `GET /usuarios/:uid` - Obtener usuario por ID
- `PATCH /usuarios` - Actualizar datos de usuario

### Docentes
- `GET /docentes` - Listar docentes
- `POST /docentes` - Crear docente
- `GET /docentes/:id` - Obtener docente por ID
- `PATCH /docentes` - Actualizar docente
- `DELETE /docentes/:id` - Eliminar docente

### Aulas
- `GET /aulas` - Listar aulas
- `POST /aulas` - Crear aula
- `GET /aulas/:id` - Obtener aula por ID
- `PATCH /aulas` - Actualizar aula
- `DELETE /aulas/:id` - Eliminar aula (soft delete)
- `GET /aulas/disponibles` - Listar aulas disponibles
- `GET /aulas/piso/:piso` - Listar aulas por piso
- `PATCH /aulas/:id/disponibilidad` - Cambiar disponibilidad

### Clases
- `GET /clases` - Listar clases
- `POST /clases` - Crear clase
- `PATCH /clases` - Actualizar clase
- `PATCH /clases/sin-estado` - Actualizar clase sin cambiar estado
- `DELETE /clases/:id` - Eliminar clase

### Dashboard
- `GET /dashboard/estadisticas` - Estadísticas generales
- `GET /dashboard/estadisticas/docentes` - Estadísticas de docentes

### Vistas
- `GET /vistas/clases-asignacion` - Vista de clases asignadas
- `GET /vistas/horario-completo` - Vista de horario completo
- `GET /vistas/carga-docentes` - Vista de carga de docentes
- `GET /vistas/ocupacion-aulas` - Vista de ocupación de aulas

### Asignación
- `POST /asignacion/resetear` - Resetear ambiente de asignación
- `POST /asignacion/generar` - Generar asignación automática

## Comandos Útiles

### Crear un Nuevo Componente
```bash
# Crear módulo
npx nest g module nombre-componente

# Crear controlador
npx nest g controller nombre-componente

# Crear servicio
npx nest g service nombre-componente
```

### Formateo y Linting
```bash
# Formatear código
npm run format

# Ejecutar linter
npm run lint
```

## Base de Datos

El proyecto utiliza Supabase como base de datos PostgreSQL. Las principales tablas incluyen:

- `usuario` - Usuarios del sistema
- `persona` - Información personal
- `docente` - Docentes del instituto
- `aula` - Aulas disponibles
- `clase` - Clases programadas
- `programa` - Programas educativos
- `asignacion` - Asignaciones de clases
- `horario` - Horarios disponibles

### Vistas Importantes
- `dashboard_stats` - Estadísticas para dashboard
- `vista_clases_asignacion` - Clases con asignaciones
- `vista_horario_completo` - Horario completo del instituto
- `vista_carga_docentes` - Carga horaria de docentes

## Funciones de Base de Datos

### Algoritmo de Asignación
- `resetear_ambiente_asignacion()` - Limpia el ambiente para nueva asignación
- `generar_asignacion()` - Ejecuta el algoritmo de asignación automática

## Licencia

Este proyecto está bajo la licencia [MIT](LICENSE).

## Soporte

Para soporte y preguntas, puedes:
- Revisar la [documentación de NestJS](https://docs.nestjs.com)
- Visitar el [canal de Discord de NestJS](https://discord.gg/G7Qnnhy)
- Consultar los [cursos oficiales](https://courses.nestjs.com/)

## Autor

Desarrollado por **Omer Benitez**, **Luis Leon** y **Lenin Cuenca** 
