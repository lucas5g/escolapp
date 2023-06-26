export function menuToUri(menu: string) {
  return menu
    .normalize("NFD") // Normaliza a string em forma de decomposição
    .replace(/[\u0300-\u036f]/g, "") // Remove os caracteres acentuados
    .toLowerCase();
}