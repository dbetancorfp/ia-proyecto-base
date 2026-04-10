# /explain

Activa el **modo de aprendizaje**. En lugar de dar una respuesta rápida o un fix directo, Claude explica los conceptos subyacentes para que entiendas el sistema y puedas razonar sobre problemas similares en el futuro.

## Cuándo usarlo

- Cuando no entiendes por qué algo funciona (o no funciona) de una determinada manera
- Cuando quieres aprender el concepto detrás de una solución, no solo aplicarla
- Al inicio de un proyecto nuevo, para que Claude te dé una visión general del código

## Cómo usarlo

**Sin argumentos** — explica el contexto actual de la conversación:

```
/explain
```

**Con argumentos** — explica un concepto concreto:

```
/explain ¿Qué es el patrón Repository y por qué lo usamos aquí?
```

```
/explain ¿Cuándo usar useFetch vs $fetch en Nuxt 4?
```

## Qué devuelve

1. **Resumen del gap conceptual** — qué concepto hay detrás de la pregunta
2. **Explicación del concepto** — qué es, por qué funciona así, dónde ocurre en el sistema
3. **Alternativas** — otras formas de resolver el mismo problema y sus trade-offs
4. **Modelo mental o diagrama** — cuando el concepto se beneficia de una visualización
5. **Quiz de validación** — 3–5 preguntas para comprobar que has entendido (Claude espera tus respuestas antes de dar la solución)

## Lo que NO hace

- No da fixes directos sin explicar el sistema
- No proporciona código sin contexto conceptual
- No inventa APIs o parámetros — si hay incertidumbre, lo dice

## Objetivo

Que al terminar puedas decir: *"Entiendo cómo funciona este sistema y por qué se comporta así"*, no solo *"apliqué un fix"*.
