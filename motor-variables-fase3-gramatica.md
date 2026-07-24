# Fase 3 — Propuesta de gramática para condicionales (SI...ENTONCES...SINO)

Documento de diseño, sin código. Basado en el diagnóstico de las 14 fórmulas
condicionales (12 claras + 2 ambiguas ya confirmadas) más C047. **C041 queda
explícitamente fuera** — es una tabla de búsqueda en texto libre, un problema
distinto que atacamos aparte.

## 1. Gramática propuesta (forma EBNF simplificada)

```
condicional   ::= "SI" condicion ["," | ":"] ["ENTONCES" [":"]] expr
                   ["SINO" [":"] expr]

condicion     ::= termino_cond (combinador termino_cond)*

termino_cond  ::= comparacion | verdad_implicita

comparacion   ::= operando operador operando

verdad_implicita ::= expr                      // ver §5 — "(TOTAL_RESTA...)" solo

operador      ::= "=" | "!=" | ">"

combinador    ::= "&&" | "y"                   // sinónimos, ver §3

operando      ::= "PROPUESTA." IDENTIFICADOR    // campo del panel
                 | literal_texto                 // ej. FOOD, SI, NO, EXONERADO
                 | literal_numero                 // ver §4

expr          ::= (grámatica aritmética de Fase 2, sin cambios: +, -, *, /,
                    paréntesis, VALOR NOMINAL, referencias a otros conceptos)
```

**Regla de fallback si falta "ENTONCES"** (ver §6) y **regla de fallback si
falta "SINO"** (ver §7) se resuelven en el parser antes de aplicar esta
gramática, no dentro de ella — así el resto del pipeline (tokenizer,
evaluador recursivo de Fase 2) no necesita saber que faltaban.

## 2. Operadores de comparación — `=`, `!=`, `>`

Confirmado en las 14 fórmulas: nunca aparecen `<`, `>=`, `<=` ni `||`. Basta
con implementar estos 3. Nota de variante ortográfica: **C001 usa `=!` en vez
de `!=`** (`PROPUESTA.ADICIONAL_ADHOC=!EXONERADO`) — propongo normalizar
`=!` → `!=` en el tokenizer como caso especial de typo conocido, ya que es
claramente la intención (mismo patrón que el resto de la condición, que sí
usa `!=` correctamente en la primera mitad).

## 3. Combinador `&&` y la palabra "y" — trato como sinónimos

`&&` aparece 4 veces; la palabra "y" aparece una sola vez, en C033. No
encontré ninguna razón semántica para tratarlos distinto — en español "y"
es simplemente la forma no simbólica de AND, y C033 es la única fórmula
escrita por una persona con un estilo más narrativo (coincide con que esa
misma fórmula tiene la estructura invertida "valor-antes-del-SI" que no se
repite en ninguna otra). Propongo: el tokenizer reconoce `&&` **y** la
palabra suelta "y" (con límites de palabra, para no confundirla con la
letra "y" dentro de otro token) como el mismo operador AND. No hace falta
soportar "o"/"OR" — no aparece en ningún lado.

**Nota aparte (no es de gramática):** C033 sigue pendiente de tu validación
de negocio sobre si la condición es una contradicción real o dos campos
distintos — eso no cambia con esta decisión de sinónimos, solo afecta cómo
se *parsea* la palabra "y" una vez que sepamos qué compara.

## 4. Formatos numéricos especiales

Tres casos a normalizar en el tokenizer, ANTES de que el valor llegue al
evaluador aritmético de Fase 2 (que ya sabe manejar números planos):

| Formato encontrado | Ejemplo real | Normalización propuesta |
|---|---|---|
| Moneda con separador de miles | `S/200,000.` (C042) | Quitar prefijo `S/`, quitar comas de miles, quitar punto final suelto → `200000` |
| Porcentaje inline | `5.2%` (C045), `10%` (C051) | Quitar el `%`, dividir entre 100 → `0.052`, `0.10` |
| Operadores unicode | `×`, `÷`, `−` (C041, C045) | Mapear a `*`, `/`, `-` respectivamente antes de tokenizar |
| Exponente `^` | `(1 + 5.2%)^(1/360)` (C045) | Agregar soporte de exponenciación a la gramática aritmética de Fase 2 (hoy no existe) — es el único caso en las 14 fórmulas, pero sin esto C045 no se puede completar |

C045 es la única fórmula que necesita los 4 al mismo tiempo — es, con
diferencia, la más compleja de las 14. Sugiero tratarla como el caso de
prueba "difícil" al final de la implementación, no como el primero.

## 5. Test de "verdad implícita" (C047)

`SI (TOTAL_RESTA_INGRESOS_GASTOS) && TOTAL_INGRESOS > 0, ENTONCES...`

La primera mitad de la condición es solo una referencia a un concepto entre
paréntesis, sin operador de comparación. Propongo: cuando un término de la
condición no tiene operador de comparación reconocible, se evalúa la
expresión y se interpreta como verdadero si el resultado es **distinto de
cero** (igual que la verdad "truthy" de JavaScript para números, que es
exactamente el comportamiento que ya usa el resto del intérprete). No
encontré otro caso así en las 14 — es exclusivo de C047.

## 6. Default de "ENTONCES" implícito — confirmado

Para C018 y C051 (`SI <condición> <valor>`, sin la palabra "ENTONCES"):
tratar como `SI <condición> ENTONCES <valor>`. Regla de detección: si
después de la condición viene directo una expresión válida (sin ningún otro
verbo/conector reconocible en medio), se asume que es la rama ENTONCES.

## 7. Default de "SINO" implícito — `0`

5 de las 14 fórmulas (C008, C042, C043, C045, C057) omiten "SINO"
por completo. Regla: si no aparece la palabra "SINO", su rama vale `0`.
Justificación: es exactamente el valor que el propio catálogo usa cuando
SÍ escribe "SINO" explícito en fórmulas comparables (C001, C026, C063 todas
usan `SINO 0`) — no es una convención que inventemos, es la que ya está en
uso en más de la mitad de los casos con SINO explícito.

## 8. Fuera de alcance de esta propuesta

- **C041** — tabla de búsqueda en prosa libre, no es un condicional SI/ENTONCES. Necesita su propio intérprete (probablemente un parser de "tabla de valores por categoría" tipo `(CLAVE=valor, CLAVE=valor, ...)`), lo evaluamos en otra sesión.
- **C033** — pendiente de tu validación de negocio sobre la condición contradictoria (ver Tarea 1 de este mensaje). La gramática de arriba puede *parsear* la fórmula sin problema una vez resuelto qué compara; lo que falta es confirmar el significado de negocio, no la sintaxis.
- **C061** — el literal de comparación ya quedó alineado esta sesión (`MONTO_FIJO_REBATE`, ver resumen). No hay nada más pendiente de sintaxis ahí.

## 9. Cobertura esperada

Con esta gramática (operadores `=`/`!=`/`>`, combinador `&&`/"y", sin
anidamiento, los 4 formatos numéricos de §4, verdad implícita, y los 2
defaults de §6-7), las **14 fórmulas condicionales quedan parseables
sintácticamente**. De ellas:
- **12 ya tendrían todo lo necesario para calcular un número real** (todas sus referencias/inputs resuelven, según la reclasificación de la sesión anterior).
- **C033** queda parseable pero bloqueada de todos modos hasta tu validación de negocio.
- **C047** depende de que sus 2 referencias (`TOTAL_RESTA_INGRESOS_GASTOS`, `TOTAL_INGRESOS`) ya resuelvan — sí resuelven, según la última reclasificación.

Quedo a la espera de tu validación de esta propuesta antes de escribir una
sola línea del parser en la próxima sesión.
