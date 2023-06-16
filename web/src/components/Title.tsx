import { menus } from "../utils/menus";
import { Card } from "./Card";

export function Title() {
  const titleHeader = menus()
    .find(menu => menu
      .normalize("NFD") // Normaliza a string em forma de decomposição
      .replace(/[\u0300-\u036f]/g, "") // Remove os caracteres acentuados
      .toLowerCase() === location.pathname.replace('/', '')) || 'Home'

  document.title = `${titleHeader} | EscolApp`
  return (
    <Card >
      <h1 className="text-4xl">
        {titleHeader}
      </h1>
    </Card>
  )
}