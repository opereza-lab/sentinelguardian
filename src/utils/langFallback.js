/**
 * Retorna el contenido en el idioma solicitado.
 * Fallback: en → es
 * Así las páginas con solo es/en muestran inglés para otros idiomas
 * en vez de mezclar español con el idioma seleccionado.
 */
export function getLangContent(contentMap, lang) {
  if (contentMap[lang]) return contentMap[lang];
  if (contentMap["en"]) return contentMap["en"];
  return contentMap["es"] || Object.values(contentMap)[0];
}
