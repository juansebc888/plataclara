# Plata Clara

Sitio de educación financiera en español, escrito para personas que cobran en
efectivo, sin contrato fijo y sin historial bancario.

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
```

## Rutas

```
/                                        Inicio
/empezando                               Abrir una cuenta
/presupuesto                             Presupuesto con ingreso variable
/credito                                 Historial crediticio desde cero
/deudas                                  Gota a gota + calculadora
/programas                               Índice de programas públicos
/programas/banca-de-las-oportunidades    Ficha del programa
/ayuda                                   Dónde buscar ayuda presencial
/herramientas                            Índice de calculadoras
/herramientas/ahorro                     Calculadora de ahorro
/herramientas/gota-a-gota                Calculadora de costo real
/sobre-el-proyecto                       Qué es esto y de dónde salen las cifras
```

## Estructura

```
src/
├── app/                    Rutas (App Router)
│   ├── layout.tsx          Navbar + Footer compartidos, next/font
│   ├── template.tsx        Transición de página (CSS, sin JS)
│   ├── globals.css         Tokens de diseño y primitivas
│   └── subpage.module.css  Estilos compartidos de subpáginas
├── components/
│   ├── layout/             Navbar (client), Footer (server)
│   ├── ui/                 Primitivas reutilizables
│   └── tools/              Calculadoras (client, lazy)
├── content/                Todo el texto y los datos, en un solo lugar
└── lib/                    Formato de moneda y matemáticas financieras
```

## Decisiones de rendimiento

El público objetivo usa teléfonos Android de gama media o baja, así que:

- **Sin librería de animación.** Todas las animaciones son CSS sobre
  `transform` y `opacity`, que corren en el compositor. Framer Motion
  habría añadido ~34 kB gzip y habría obligado a convertir en Client
  Component todo lo animado.
- **Server Components por defecto.** Solo son cliente `Navbar`, `Reveal`,
  `Pictogram` y las dos calculadoras.
- **Iconos SVG inline** en vez de una librería de iconos.
- **Calculadoras con `next/dynamic`** y `ssr: false`: no entran en el
  bundle inicial.
- **`next/font`** auto-hospeda las fuentes: sin request a Google, sin CLS.
- **`backdrop-filter` solo en pantallas grandes** y donde el navegador lo
  soporte; es caro de pintar en GPU modestas.
- **`prefers-reduced-motion`** desactiva todo el movimiento.

## Pendiente antes de publicar

Estas cifras están en el código marcadas con `VERIFICAR`:

- `src/lib/finance.ts` → `RATES.cdtEA` (8,5% EA). Las tasas de CDT se
  mueven con las decisiones del Banco de la República.
- `src/lib/finance.ts` → `RATES.gotaMonthly` y `RATES.formalMonthly`.
- `src/content/facts.ts` → la cifra de préstamo informal está citada de
  segunda mano; falta la publicación original del Banco de la República.

Además, el contenido de las páginas es provisional: cada subpágina tiene
un bloque `Pendiente` que dice exactamente qué falta escribir y verificar.
