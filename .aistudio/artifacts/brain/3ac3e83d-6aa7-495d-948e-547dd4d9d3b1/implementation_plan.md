# Rediseño Minimalista Editorial y Modo Claro/Oscuro

Transformación visual del portafolio técnico de Claudio Leiva hacia una estética editorial de alta gama, limpia y aireada, incorporando un sistema completo de cambio entre tema claro y tema oscuro con detección automática de preferencias del sistema y persistencia local.

## Decisiones Críticas y Preferencias Confirmadas

> [!IMPORTANT]
> Decisiones validadas mediante la fase de clarificación con el usuario:
> - **Estética Visual**: Diseño editorial refinado, con tipografía nítida, líneas de división sutiles (hairline borders) y generoso espacio negativo, eliminando saturaciones visuales y gradientes excesivos.
> - **Gestión de Tema**: Detección automática de la preferencia del sistema (`prefers-color-scheme`) con persistencia en `localStorage` e interruptor accesible e intuitivo (Sol / Luna) en la barra superior de navegación.
> - **Herramientas Interactivas**: Se conservan al 100% el *MySQL Query Profiler*, el *Laboratorio de Arquitectura Laravel* y el visor de código SQL, adaptando sus contenedores a un estilo más limpio, legible y espaciado tanto en fondo blanco/gris pálido como en pizarra oscura.

---

## 1. Visión General y Concepto Central

- **Propósito**: Elevar el perfil técnico de Claudio Leiva a un estándar de consultor senior y arquitecto de software de clase mundial, donde la claridad tipográfica, la sobriedad y la jerarquía visual comuniquen maestría técnica sin recurrir a elementos visuales estridentes.
- **Audiencia Objetivo**: Directores de ingeniería (CTOs, VPs of Engineering), arquitectos de software, fundadores de startups e ingenieros líderes en busca de un experto en PHP/Laravel y MySQL de alto rendimiento.
- **Valor Agregado**: Experiencia de lectura descansada con soporte dual (Light/Dark) que se adapta al entorno lumínico del usuario, garantizando legibilidad óptima para código fuente, planes de ejecución EXPLAIN y decisiones arquitectónicas.

---

## 2. Experiencia de Usuario y Dirección Visual

### A. Paleta de Color y Sistema de Superficies (60-30-10)

- **Modo Claro (Editorial Clean)**:
  - *Lienzo Base (60%)*: Blanco puro `#FFFFFF` y fondo suave `#F8FAFC` (Slate 50) para ritmo de lectura.
  - *Superficies Estructurales (30%)*: Contenedores en `#FFFFFF` con sutiles divisores hairline `#E2E8F0` (Slate 200) y sombras micro-difusas (`shadow-[0_1px_3px_rgba(0,0,0,0.05)]`). Texto principal en `#0F172A` (Slate 900) con texto secundario en `#475569` (Slate 600).
  - *Acentos (10%)*: Carmesí Laravel `#E11D48` / `#BE123C` (Rose 600/700) para llamadas de acción primarias y toques de precisión MySQL `#0284C7` (Sky 600).

- **Modo Oscuro (Obsidian Studio)**:
  - *Lienzo Base (60%)*: Pizarra ultra profunda `#0B0F17` / `#020617` (Slate 950).
  - *Superficies Estructurales (30%)*: Tarjetas en `#0F172A` / `#1E293B` con divisores finos `#1E293B` / `#334155`. Tipografía en `#F8FAFC` (Slate 50) y metadatos en `#94A3B8` (Slate 400).
  - *Acentos (10%)*: Carmesí vibrante `#F43F5E` (Rose 500) y Cian técnico `#38BDF8` (Sky 400).

### B. Tipografía y Reglas Anti-Slop (Frontend Design Constitution)

- **Tipografía de Alto Calibre**: `Plus Jakarta Sans` para lectura editorial nítida y jerarquía equilibrada; `Fira Code` / `JetBrains Mono` con cifras tabulares (`tabular-nums`) para telemetría, consultas SQL y métricas.
- **Zero-Pill & Metadata Limpia**: Reemplazo de cápsulas y píldoras flotantes por metadatos planos unboxed separados por puntos elegantes (`·` o `/`), reduciendo el ruido visual.
- **Top Bar Contract**: Barra de navegación superior con diseño exacto de 3 zonas:
  1. Identidad tipográfica limpia (Logomarca e iniciales sobrias).
  2. Enlaces de texto directo sin fondos de pastilla.
  3. Controles funcionales: Selector de tema Claro/Oscuro y botón principal de contacto/agendamiento.

---

## 3. Decisiones de Producto y Arquitectura Técnica

### A. Gestión de Tema y Estado

- **Implementación**: Contexto o Hook React personalizado `useTheme` que gestiona:
  - Estado: `'light' | 'dark'`.
  - Sincronización bidireccional con la clase `.dark` en el elemento raíz `<html>` o contenedor principal.
  - Almacenamiento seguro en `localStorage.getItem('cl_portfolio_theme')`.
  - Escucha de cambios de preferencia del sistema operativo mediante `window.matchMedia('(prefers-color-scheme: dark)')`.
- **Transición Fluida**: Transiciones sutiles de color de fondo y borde (`transition-colors duration-200`) sin retrasos ni parpadeos (FOUC).

### B. Limpieza y Reorganización de Módulos

- **Hero Minimalista**: Foco en la propuesta de valor técnica de Claudio, métricas consolidadas en una banda horizontal limpia y visualizador de consulta SQL depurado.
- **Proyectos & Laboratorio MySQL**: Tarjetas más aireadas, sin bordes gruesos de color, con bloques de código y planes EXPLAIN que alternan entre fondo claro tipo papel técnico y fondo de consola oscura según el tema.
- **Servicios y Contacto**: Formularios y tarjetas de cotización con campos limpios, bordes sutiles y estados de foco de alto contraste.

---

## 4. Diagrama de Arquitectura y Flujo de Datos

```
┌────────────────────────────────────────────────────────────────────────┐
│                          Root Application (App.tsx)                    │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                 ThemeContext / useTheme Hook                   │   │
│   │  • Detects prefers-color-scheme / localStorage                 │   │
│   │  • Toggles light / dark class on <html> document root          │   │
│   └────────────────────────────────┬───────────────────────────────┘   │
│                                    │                                   │
│              ┌─────────────────────┼─────────────────────┐             │
│              ▼                     ▼                     ▼             │
│     ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐    │
│     │     Navbar      │   │   Hero & KPI    │   │  Projects Grid  │    │
│     │ • 3-zone layout │   │ • Clean spacing │   │ • Unboxed tags  │    │
│     │ • Sun/Moon icon │   │ • Metric strip  │   │ • Architecture  │    │
│     │ • Contact CTA   │   │ • Live profiler │   │   modal viewer  │    │
│     └─────────────────┘   └─────────────────┘   └─────────────────┘    │
│              │                     │                     │             │
│              ▼                     ▼                     ▼             │
│     ┌─────────────────┐   ┌─────────────────┐   ┌─────────────────┐    │
│     │    MySQL Lab    │   │ Skills/Services │   │ Contact/Booking │    │
│     │ • 3 scenarios   │   │ • 4 pillars     │   │ • Realtime form │    │
│     │ • EXPLAIN trees │   │ • Clean cards   │   │ • Meeting modal │    │
│     │ • Light/Dark UI │   │ • Pricing specs │   │ • Mail/WhatsApp │    │
│     └─────────────────┘   └─────────────────┘   └─────────────────┘    │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Plan de Ejecución por Pasos

1. **Infraestructura de Tema (`src/context/ThemeContext.tsx`)**:
   - Crear el contexto y hook para alternar tema `light` y `dark`.
   - Conectar detección de `prefers-color-scheme` y persistencia en `localStorage`.
   - Configurar soporte de clases `dark` en Tailwind / CSS global.

2. **Refactorización de Navbar y Cabecera**:
   - Incorporar el interruptor interactivo de Sol / Luna con animación suave y accesibilidad aria.
   - Ajustar el encabezado a la regla estricta de 3 zonas y eliminar badges superfluos.

3. **Adecuación de Secciones al Estilo Editorial**:
   - **Hero**: Tipografía balanceada, espaciado generoso y barra de KPIs limpia.
   - **ProjectsSection**: Tarjetas con fondos claros/oscuros adaptables, tipografía refinada y metadatos sin cápsulas.
   - **MySqlLab**: Ajuste del profiler y de los simuladores de consultas a una estética sobria de laboratorio técnico legible en ambos temas.
   - **SkillsSection, ServicesSection & ExperienceSection**: Reemplazo de fondos oscuros fijos por tokens reactivos (`bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800`).
   - **ContactSection, BookingModal & Footer**: Formulario limpio con inputs de bordes sutiles y contraste de foco AA.

4. **Verificación y Pruebas**:
   - Validar compilación (`compile_applet`) y chequeo de tipos (`lint_applet`).
   - Comprobar legibilidad y contraste en ambos modos.
