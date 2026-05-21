# Calzado Industrial Brisco - Dashboard

![CI/CD](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions/workflows/ci.yml/badge.svg)
[![Tests](https://img.shields.io/github/actions/workflow/status/wasakabeofficial/calzado_industrial_brisco/ci.yml?label=Tests)](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions)
[![Coverage](https://codecov.io/gh/wasakabeofficial/calzado_industrial_brisco/branch/main/graph/badge.svg)](https://codecov.io/gh/wasakabeofficial/calzado_industrial_brisco)

Dashboard de gestión de leads para Calzado Industrial Brisco, una empresa mexicana dedicada a la fabricación y distribución de calzado industrial.

## 🚀 Características

- **Dashboard** — 7 gráficos interactivos con métricas de leads (barras verticales, donut, barras horizontales)
- **Clientes** — Tabla de clientes con filtros avanzados (proceso, empresa, cliente, fechas, interés, duración, razón de terminación)
- **Sidebar** — Navegación colapsable con iconos (react-icons)
- **Lead Detail** — Información detallada del lead con secciones organizadas, badges de estado y transcripción/audio
- **Transcripciones** — Obtención de transcripciones de llamadas via webhook n8n
- **Audio de Llamadas** — Escucha de grabaciones via Google Drive
- **Diseño Responsivo** — Interfaz adaptable a móvil, tablet y desktop

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-------------|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Estilos | Tailwind CSS v4 |
| Fuente de Datos | n8n Webhook (API REST) + Supabase |
| Gráficos | HTML/CSS puro (barras, donut SVG) |
| Orquestación | n8n (webhooks) |
| Testing | Vitest + React Testing Library |

## 📁 Estructura del Proyecto (Clean Architecture)

```
src/
├── domain/              # Capa de dominio
│   ├── entities/       # Tipos e interfaces (ContactoBriscoResponse, LeadFilters, etc.)
│   └── services/       # Lógica de negocio (LeadService)
├── data/                # Capa de datos
│   └── repositories/    # Cliente n8n (n8nUrl helper)
├── infrastructure/      # Capa de infraestructura
│   └── routes/          # Configuración de rutas
└── presentation/        # Capa de presentación
    ├── components/      # Componentes UI (charts, tablas, filtros, modal, loading)
    ├── hooks/           # Hooks personalizados (useLeadList, useLeadDetail, etc.)
    ├── layout/          # Layout, Sidebar, Logo
    └── pages/           # Páginas (Dashboard, Clientes, LeadDetail)
```

## 📄 Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard con 7 gráficos |
| `/clientes` | Tabla de clientes con filtros |
| `/lead/:id` | Detalle de lead con transcripción y audio |

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Supabase
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=tu_key

# n8n
VITE_N8N_BASE_URL=https://tu-n8n.com/webhook
VITE_N8N_CONTACTOS_PATH=getContactosBrisco
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

| # | Componente | Tipo | Descripción |
|---|-----------|------|-------------|
| 1 | **InterestChart** | Barras verticales | Distribución por nivel de interés (Alto, Medio, Bajo, Sin interés) |
| 2 | **CallStatusChart** | Donut SVG | Estado de las llamadas (Completado, Fallido, Sin Respuesta, etc.) |
| 3 | **ConversionChart** | Barras verticales | Tasa de conversión (Aceptó vs Rechazó) |
| 4 | **FollowUpActionChart** | Barras verticales | Acciones de seguimiento (Cotización, Catálogo, Reprogramar, etc.) |
| 5 | **ObjectionChart** | Barras verticales | Objeciones principales (Precio, Interés, Tiempo, Ninguna) |
| 6 | **CallDurationChart** | Barras verticales | Duración de llamadas agrupada en rangos (0-30s, 31-60s, 1-2min, etc.) |
| 7 | **CallEndReasonChart** | Barras verticales | Top 8 razones de terminación de llamada |

Todos los gráficos incluyen:
- Leyenda personalizada con indicadores de color
- Tooltip interactivo al hacer hover
- Diseño responsivo full-width
- Total de registros en el pie del gráfico

## 🔗 Integraciones

| Servicio | Uso |
|----------|-----|
| **Supabase** | Autenticación y almacenamiento |
| **n8n Webhooks** | Obtención de contactos, transcripciones y audios |
| **Google Drive** | Almacenamiento y reproducción de grabaciones |

## ✅ Quality Assurance

- **Vitest** — Testing unitario con React Testing Library (10 suites, 35 tests)
- **ESLint** — Linting de código
- **TypeScript** — Tipado estático
- **GitHub Actions** — CI/CD automatizado
- **Codecov** — Reports de cobertura

## 👥 Equipo

Desarrollado por [Neuropoint.ai](https://neuropoint.ai)

---

*Dashboard para Calzado Industrial Brisco - México*
