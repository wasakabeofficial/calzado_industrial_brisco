# Calzado Industrial Brisco - Dashboard

![CI/CD](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions/workflows/ci.yml/badge.svg)
[![Tests](https://img.shields.io/github/actions/workflow/status/wasakabeofficial/calzado_industrial_brisco/ci.yml?label=Tests)](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions)
[![Coverage](https://codecov.io/gh/wasakabeofficial/calzado_industrial_brisco/branch/main/graph/badge.svg)](https://codecov.io/gh/wasakabeofficial/calzado_industrial_brisco)

Dashboard de gestión de leads y campañas para Calzado Industrial Brisco, una empresa mexicana dedicada a la fabricación y distribución de calzado industrial.

## 🚀 Características

- **Dashboard** - 6 gráficos interactivos con métricas de leads
- **Clientes** - Tabla de clientes con filtros avanzados
- **Campañas** - CRUD completo (crear, editar, filtrar) con modal de creación
- **Sidebar** - Navegación colapsable con iconos (react-icons)
- **Transcripciones** - Obtención de transcripciones de llamadas via webhook n8n
- **Audio de Llamadas** - Escucha de grabaciones via Google Drive
- **Diseño Responsivo** - Interfaz adaptable a móvil, tablet y desktop

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-------------|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Estilos | Tailwind CSS v4 |
| Fuente de Datos | n8n Webhook (API REST) |
| Gráficos | Recharts |
| Orquestación | n8n (webhooks) |
| Testing | Vitest + React Testing Library |

## 📁 Estructura del Proyecto (Clean Architecture)

```
src/
├── domain/              # Capa de dominio
│   ├── entities/       # Tipos e interfaces (ContactoBriscoResponse, Campana, etc.)
│   └── services/       # Lógica de negocio (LeadService, CampanaService)
├── data/                # Capa de datos
│   └── repositories/    # Cliente n8n (n8nUrl helper)
├── infrastructure/      # Capa de infraestructura
│   └── routes/          # Configuración de rutas
└── presentation/        # Capa de presentación
    ├── components/      # Componentes UI (charts, tablas, filtros, modal, loading)
    ├── hooks/           # Hooks personalizados (useLeadList, useCampanas, etc.)
    ├── layout/          # Layout, Sidebar, Logo
    └── pages/           # Páginas (Dashboard, Clientes, Campanas, CampanaDetail, LeadDetail)
```

## 📄 Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard con gráficos |
| `/clientes` | Tabla de clientes con filtros |
| `/campanas` | Tabla de campañas con filtros y botón crear |
| `/campanas/:id` | Detalle y edición de campaña |
| `/lead/:id` | Detalle de lead con transcripción y audio |

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# n8n
VITE_N8N_BASE_URL=https://tu-n8n.com/webhook
VITE_N8N_CONTACTOS_PATH=getContactosBrisco
VITE_N8N_CAMPANAS_PATH=getCampanasBrisco
VITE_N8N_WEBHOOK_PATH=web_google_drive
VITE_N8N_AUDIO_WEBHOOK_PATH=web_google_drive_audio

# Google Drive
VITE_GOOGLE_DRIVE_BASE_URL=https://drive.google.com/file/d/
```

### Scripts Disponibles

```bash
npm install          # Instalar dependencias
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm test             # Tests (watch mode)
npm run test:run     # Tests (single run)
npm test:coverage    # Tests con coverage
npm run lint         # Linting
```

## 📊 Gráficos Disponibles

1. **InterestChart** - Distribución por nivel de interés
2. **CallStatusChart** - Estado de las llamadas (gráfico circular)
3. **ConversionChart** - Tasa de conversión
4. **FollowUpActionChart** - Acciones de seguimiento
5. **ObjectionChart** - Objeciones principales
6. **CallFrequencyChart** - Frecuencia de llamadas (línea)

## 🔗 Integraciones

| Servicio | Uso |
|----------|-----|
| **n8n Webhooks** | Obtención de contactos, campañas, transcripciones y audios |
| **Google Drive** | Almacenamiento y reproducción de grabaciones |

## ✅ Quality Assurance

- **Vitest** - Testing unitario con React Testing Library
- **ESLint** - Linting de código
- **TypeScript** - Tipado estático
- **GitHub Actions** - CI/CD automatizado
- **Codecov** - Reports de cobertura

## 👥 Equipo

Desarrollado por [Neuropoint.ai](https://neuropoint.ai)

---

*Dashboard para Calzado Industrial Brisco - México*
