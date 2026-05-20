# Calzado Industrial Brisco - Dashboard

![CI/CD](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions/workflows/ci.yml/badge.svg)
[![Tests](https://img.shields.io/github/actions/workflow/status/wasakabeofficial/calzado_industrial_brisco/ci.yml?label=Tests)](https://github.com/wasakabeofficial/calzado_industrial_brisco/actions)
[![Coverage](https://codecov.io/gh/wasakabeofficial/calzado_industrial_brisco/branch/main/graph/badge.svg)](https://codecov.io/gh/wasakabeofficial/calzado_industrial_brisco)

Dashboard de gestión de leads para Calzado Industrial Brisco, una empresa mexicana dedicada a la fabricación y distribución de calzado industrial.

## 🚀Características

- **Gestión de Leads** - Visualización y seguimiento de clientes potenciales
- **Filtros Avanzados** - Filtrado por proceso, empresa, cliente, fecha e interés
- **Transcripciones** - Obtención de transcripciones de llamadas via webhook n8n
- **Visualizaciones** - 6 gráficos interactivos con Recharts
- **Diseño Responsivo** - Interfaz adaptable a diferentes tamaños de pantalla

## 🛠️Tecnologías

| Categoría | Tecnología |
|-----------|-------------|
| Frontend | React 19 + TypeScript |
| Build Tool | Vite 8 |
| Estilos | Tailwind CSS v4 |
| Base de Datos | Supabase |
| Gráficos | Recharts |
| Orquestación | n8n (webhooks) |

## 📁Estructura del Proyecto

```
src/
├── domain/              # Capa de dominio
│   ├── entities/       # Tipos e interfaces (Lead, LeadFilters)
│   └── services/       # Lógica de negocio (LeadService)
├── data/               # Capa de datos
│   └── repositories/  # Cliente de Supabase
├── infrastructure/    # Capa de infraestructura
│   └── routes/        # Configuración de rutas
└── presentation/       # Capa de presentación
    ├── components/    # Componentes UI (charts, tabla, filtros)
    ├── hooks/         # Hooks personalizados
    ├── layout/        # Layout y componentes de diseño
    └── pages/         # Páginas principales
```

## ⚙️Configuración

### Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_KEY=tu_supabase_anon_key
```

### Instalación

```bash
npm install
```

### Desarrollo

```bash
npm run dev
```

### Producción

```bash
npm run build
```

## 📊Gráficos Disponibles

1. **InterestChart** - Distribución por nivel de interés
2. **CallStatusChart** - Estado de las llamadas
3. **ConversionChart** - Tasa de conversión
4. **FollowUpActionChart** - Acciones de seguimiento
5. **ObjectionChart** - Objeciones principales
6. **CallFrequencyChart** - Frecuencia de llamadas (formato polígono)

## 🔗Integraciones

- **Supabase** - Base de datos PostgreSQL para almacenamiento de leads
- **n8n Webhook** - Integración para obtener transcripciones de llamadas VAPI

## 📝Licencia

Desarrollado por [Neuropoint.ai](https://neuropoint.ai)

---

*Dashboard para Calzado Industrial Brisco - México*