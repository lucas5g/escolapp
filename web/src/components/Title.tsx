import { Card } from "./Card";
import { menus } from "./Header";

export function Title() {
  const titleHeader = menus.find(menu => menu.toLowerCase() === location.pathname.replace('/', '')) || 'Home'
  
  document.title = `JISA | ${titleHeader}`
  return (
    <Card >
      <h1 className="text-4xl mb">
        {titleHeader}
      </h1>
    </Card>
  )
}