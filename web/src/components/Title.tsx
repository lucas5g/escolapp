import { Card } from "./Card";
import { menus } from "./Header";

export function Title() {
  const title = menus.find(menu => menu.toLowerCase() === location.pathname.replace('/', '')) || 'Home'

  document.title = `JISA | ${title}`
  return (
    <Card >
      <h1 className="text-4xl mb">
        {title}
      </h1>
    </Card>
  )
}