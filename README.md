# 🚀 ImpulsoVzla - Plataforma de Donaciones para Venezolanos con Binance Pay

ImpulsoVzla es una plataforma web ágil, transparente y mobile-first pensada para financiar metas de emprendimiento y causas comunitarias de venezolanos dentro y fuera del país, sin intermediarios bancarios tradicionales.

---

## 🌟 Características Principales

1. **Integración con Binance Pay:**
   - ID oficial de recaudación: **`37999878`**.
   - $0 costo de red y transferencias en USDT/USDC.
   - Cálculo transparente de comisión: **5% para sostenimiento operativo de la plataforma** y **95% neto directo al creador**.

2. **Categorías:**
   - 🚀 **Emprendimientos & Metas Personales** (herramientas, repostería, talleres, equipos de trabajo).
   - 🤝 **Causas Comunitarias & Sociales** (comedores, rescate animal, salud, jornadas escolares).

3. **Muro de Experiencias y Calificaciones:**
   - Valoración de 1 a 5 estrellas con testimonios tanto de donantes (diáspora/local) como de creadores de metas.
   - Construcción de confianza comunitaria radical.

4. **Tecnologías:**
   - **Frontend:** Next.js 14 (App Router) + Tailwind CSS + Lucide Icons.
   - **Backend / DB:** Supabase (PostgreSQL con triggers automáticos).
   - **Despliegue:** Optimizado para Vercel.

---

## 🛠️ Instalación Local

```bash
cd donaciones_vzla
npm install
npm run dev
```

Abre en tu navegador: `http://localhost:3000`

---

## 🚀 Despliegue en Vercel

1. Importa este repositorio en tu cuenta de [Vercel](https://vercel.com).
2. Añade las siguientes variables de entorno en el panel de Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL` = (Tu URL de Supabase)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = (Tu Anon Key de Supabase)
   - `NEXT_PUBLIC_BINANCE_PAY_ID` = `37999878`
   - `NEXT_PUBLIC_PLATFORM_FEE_PERCENT` = `5`
