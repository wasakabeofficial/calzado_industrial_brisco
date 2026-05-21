# Calzado Industrial Brisco - Dashboard

![CI/CD](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions/workflows/ci.yml/badge.svg)
[![Tests](https://img.shields.io/github/actions/workflow/status/wasakabeofficial/calzado_industrial_brisco/ci.yml?label=Tests)](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions)

Dashboard de gestión de leads para **Calzado Industrial Brisco**, empresa mexicana dedicada a la fabricación y distribución de calzado industrial.

## 🚀 Características

- **Dashboard** — 7 gráficos con métricas de leads: barras reutilizables (6) + donut SVG (1)
- **Clientes** — Tabla con filtros: proceso, empresa, cliente, fechas, interés, duración, razón de terminación
- **Lead Detail** — Información completa del lead con secciones, badges, transcripción y audio
- **Sidebar** — Navegación colapsable con iconos (react-icons)
- **Transcripciones** — Obtención de transcripciones via webhook n8n
- **Audio de Llamadas** — Reproducción de grabaciones via Google Drive
- **Diseño Responsivo** — adaptable a móvil, tablet y desktop

## 🛠️ Stack Tecnológico

| Categoría | Tecnología |
|-----------|-------------|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Estilos | Tailwind CSS v4 |
| Fuente de Datos | n8n Webhook (API REST) |
| Gráficos | HTML/CSS puro (barras reutilizables, donut SVG) |
| Orquestación | n8n (webhooks) |
| Testing | Vitest + React Testing Library |

## 📁 Arquitectura (Clean Architecture)

```
src/
├── App.tsx                ← Composition root (rutas + layout)
├── domain/                ← Núcleo: 0 dependencias externas
│   ├── entities/          → ContactoBriscoResponse, LeadFilters
│   └── services/          → filterLeads() — lógica de negocio pura
├── data/                  ← Datos: depende solo de domain/
│   ├── repositories/      → N8nClient, n8nUrl
│   └── services/          → leadService (orquestación API + filtrado)
└── presentation/          ← UI: depende de domain/ y data/
    ├── components/
    │   ├── charts/        → Gráficos reutilizables (VerticalBarChart + 6 wrappers, CallStatusChart)
    │   └── ui/            → Table, Modal, Loading, LeadFiltersBar
    ├── hooks/             → useLeadList, useLeadDetail, useLeadTranscription, useLeadAudio
    ├── layout/            → Layout, Sidebar, Logo
    └── pages/             → Dashboard, Clientes, LeadDetail, LeadInfo
```

Reglas de dependencia:
- `domain/` → no importa nada de `data/` ni `presentation/`
- `data/` → importa `domain/`, no importa `presentation/`
- `presentation/` → importa `domain/` y `data/`
- `App.tsx` (composition root) → cablea todo

## 📄 Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Dashboard con 7 gráficos |
| `/clientes` | Tabla de clientes con filtros |
| `/lead/:id` | Detalle de lead con transcripción y audio |

## ⚙️ Configuración

### Variables de Entorno

```env
# n8n
VITE_N8N_BASE_URL=https://tu-n8n.com/webhook
VITE_N8N_CONTACTOS_PATH=getContactosBrisco
VITE_N8N_WEBHOOK_PATH=web_google_drive
VITE_N8N_AUDIO_WEBHOOK_PATH=web_google_drive_audio

# Google Drive
VITE_GOOGLE_DRIVE_BASE_URL=https://drive.google.com/file/d/
```

### Scripts

```bash
npm install          # Instalar dependencias
npm run dev          # Desarrollo local
npm run build        # Build de producción
npm test             # Tests (watch mode)
npm run test:run     # Tests (single run)
npm run test:coverage # Tests con coverage
npm run lint         # Linting
```

## 📊 Gráficos

| # | Componente | Tipo | Descripción |
|---|-----------|------|-------------|
| 1 | **InterestChart** | Barras | Nivel de interés (Alto, Medio, Bajo, Sin interés) |
| 2 | **CallStatusChart** | Donut SVG | Estado de llamadas (Completado, Fallido, Sin Respuesta, etc.) |
| 3 | **ConversionChart** | Barras | Tasa de conversión (Aceptó vs Rechazó) |
| 4 | **FollowUpActionChart** | Barras | Acciones de seguimiento (Cotización, Catálogo, Reprogramar, etc.) |
| 5 | **ObjectionChart** | Barras | Objeciones principales (Precio, Interés, Tiempo, Ninguna) |
| 6 | **CallDurationChart** | Barras | Duración en rangos (0-30s, 31-60s, 1-2min, 2-5min, 5+ min) |
| 7 | **CallEndReasonChart** | Barras | Top 8 razones de terminación de llamada |

Los 6 de barras usan `VerticalBarChart` (componente reutilizable). Todos incluyen leyenda, tooltip hover y total en footer.

## 🔗 Integraciones

| Servicio | Uso |
|----------|-----|
| **n8n Webhooks** | Obtención de contactos, transcripciones y audios |
| **Google Drive** | Almacenamiento y reproducción de grabaciones |

## ✅ Calidad

- **Vitest** — 10 suites, 35 tests unitarios
- **ESLint** — 0 errores, 0 warnings
- **TypeScript** — Tipado estático estricto
- **GitHub Actions** — CI/CD automatizado

## 👥 Equipo

Desarrollado por [Neuropoint.ai](https://neuropoint.ai)

---

*Dashboard para Calzado Industrial Brisco — México*
