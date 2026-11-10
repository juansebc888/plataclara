# Plata Clara

Sitio de educación financiera en español, escrito para personas que cobran en
efectivo, sin contrato fijo y sin historial bancario.

## Correr el proyecto

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run typecheck
npm run lint
npm test           # matemáticas financieras (node:test, sin dependencias)
```

Requiere Node 22.18 o más nuevo (los tests corren TypeScript directo con
Node).

## Rutas

```
/                                        Inicio
/empezando                               Abrir una cuenta
/presupuesto                             Presupuesto con ingreso variable
/credito                                 Historial crediticio desde cero
/deudas                                  Gota a gota + calculadora
/estafas                                 Señales de las estafas más comunes
/programas                               Índice de programas públicos
/programas/banca-de-las-oportunidades    Ficha del programa
/programas/[slug]                        Fichas de BEPS, Fondo Emprender, etc.
/ayuda                                   Dónde buscar ayuda presencial
/glosario                                Palabras del banco en español claro
/mi-plan                                 Plan imprimible, sin guardar datos
/herramientas                            Índice de calculadoras
/herramientas/ahorro                     Calculadora de ahorro con CDTs
/herramientas/gota-a-gota                Calculadora de costo real
/privacidad                              Qué se mide y qué no
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
  `Pictogram`, las dos calculadoras y el armador de plan.
- **Iconos SVG inline** en vez de una librería de iconos.
- **Calculadoras con `next/dynamic`** y `ssr: false`: no entran en el
  bundle inicial.
- **Sin JavaScript el contenido igual se ve:** un `<noscript>` anula la
  animación de entrada de `Reveal`.
- **`next/font`** auto-hospeda las fuentes: sin request a Google, sin CLS.
- **`backdrop-filter` solo en pantallas grandes** y donde el navegador lo
  soporte; es caro de pintar en GPU modestas.
- **`prefers-reduced-motion`** desactiva todo el movimiento.

## Cómo calcula la calculadora de ahorro

Un CDT no recibe depósitos diarios: se abre con una suma (en entidades
digitales el mínimo típico es $100.000), paga los intereses al vencer y el
banco retiene el 4% de esos intereses. `simulateCdtSavings` en
`src/lib/finance.ts` modela exactamente eso: junta lo que guardas, abre un
CDT a un año cada vez que alcanza el mínimo, reinvierte al vencimiento y no
cuenta intereses de CDTs que aún no han vencido. Por eso a un año la
diferencia es cero, y el texto de la página lo explica.

La calculadora de gota a gota compone el 20% mensual durante un año sin
pagos. Es intencionalmente el peor caso: sirve como advertencia.

## Datos que hay que actualizar

Todo vive en `src/lib/finance.ts` (`RATES` y `REFERENCE`). `npm test`
falla cuando `REFERENCE.year` no es el año en curso, para que no se olvide.

| Dato | Valor actual | Cada cuánto |
| --- | --- | --- |
| Tasa de usura de consumo (`usuraEA`) | 28,34% EA, noviembre de 2026 | Cada mes (Superfinanciera) |
| Tasa CDT (`cdtEA`) | 10,5% EA | Cada pocos meses |
| Retención en la fuente CDT | 4% de los intereses | Si cambia la norma |
| Salario mínimo y auxilio de transporte | 2026 | Cada enero |
| Gota a gota y microcrédito (`gotaMonthly`, `formalMonthly`) | 20% y 2,5% mensual | Referenciales |

## Pendiente antes de publicar

Marcado en el código con `VERIFICAR`:

- `src/content/facts.ts`: la cifra de préstamo informal está citada de
  segunda mano; falta la publicación original del Banco de la República.
- `src/content/empezando.ts`: topes de saldo y retiro de las cuentas
  simplificadas.
- `src/content/credito.ts`: plazos de permanencia del reporte negativo.
- `src/content/ayuda.ts`: teléfonos y direcciones locales.
