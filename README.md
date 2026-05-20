# Calzado Industrial Brisco - Dashboard

![CI/CD](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions/workflows/ci.yml/badge.svg)
[![Tests](https://img.shields.io/github/actions/workflow/status/wasakabeofficial/calzado_industrial_brisco/ci.yml?label=Tests)](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions)
[![Coverage](https://codecov.io/gh/wasakabeofficial/calzado_industrial_brisco/branch/main/graph/badge.svg)](https://codecov.io/gh/wasakabeofficial/calzado_industrial_brisco)
[![SonarCloud](https://sonarcloud.io/api/project_badges/measure?project=wasakabeofficial_calzado_industrial_brisco&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=wasakabeofficial_calzado_industrial_brisco)

Dashboard de gestión de leads para Calzado Industrial Brisco, una empresa mexicana dedicada a la fabricación y distribución de calzado industrial.

## 🚀 Características

- **Gestión de Leads** - Visualización y seguimiento de clientes potenciales
- **Filtros Avanzados** - Filtrado por proceso, empresa, cliente, fecha e interés
- **Transcripciones** - Obtención de transcripciones de llamadas via webhook n8n
- **Audio de Llamadas** - Escucha de grabaciones via Google Drive integration
- **Visualizaciones** - 6 gráficos interactivos con Recharts
- **Diseño Responsivo** - Interfaz adaptable a diferentes tamaños de pantalla

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-------------|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Estilos | Tailwind CSS v4 |
| Base de Datos | Supabase (PostgreSQL) |
| Gráficos | Recharts |
| Orquestación | n8n (webhooks) |
| Testing | Vitest + React Testing Library |

## 📁 Estructura del Proyecto (Clean Architecture)

```
src/
├── domain/              # Capa de dominio
│   ├── entities/       # Tipos e interfaces (Lead, LeadFilters)
│   └── services/       # Lógica de negocio (LeadService)
├── data/                # Capa de datos
│   └── repositories/    # Cliente de Supabase
├── infrastructure/      # Capa de infraestructura
│   └── routes/          # Configuración de rutas
└── presentation/        # Capa de presentación
    ├── components/      # Componentes UI (charts, tabla, filtros, Loading)
    ├── hooks/           # Hooks personalizados (useLeadList, useLeadAudio, etc.)
    ├── layout/          # Layout, Logo, Footer
    └── pages/           # Páginas principales (LeadTable, LeadDetail)
```

## ⚙️ Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
# Supabase
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=tu_supabase_publishable_key

# n8n Webhooks
VITE_N8N_WEBHOOK_URL=https://tu-n8n.com/webhook/transcription
VITE_N8N_AUDIO_WEBHOOK_URL=https://tu-n8n.com/webhook/audio

# Google Drive
VITE_GOOGLE_DRIVE_BASE_URL=https://drive.google.com/file/d/

# Tabla de Leads (opcional, default: leads_brisco)
VITE_LEADS_TABLE=leads_brisco
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
2. **CallStatusChart** - Estado de las llamadas
3. **ConversionChart** - Tasa de conversión
4. **FollowUpActionChart** - Acciones de seguimiento
5. **ObjectionChart** - Objeciones principales
6. **CallFrequencyChart** - Frecuencia de llamadas (formato polígono)

## 🔗 Integraciones

| Servicio | Uso |
|----------|-----|
| **Supabase** | Base de datos PostgreSQL para almacenamiento de leads |
| **n8n Webhooks** | Obtención de transcripciones y audios de llamadas VAPI |
| **Google Drive** | Almacenamiento y reproducción de grabaciones |

## ✅ Quality Assurance

- **Vitest** - Testing unitario con React Testing Library
- **ESLint** - Linting de código
- **TypeScript** - Tipado estático
- **GitHub Actions** - CI/CD automatizado
- **Codecov** - Reports de cobertura
- **SonarCloud** - Análisis estático de código

## 👥 Equipo

Desarrollado por [Neuropoint.ai](https://neuropoint.ai)

---

*Dashboard para Calzado Industrial Brisco - México*