import { Card } from "./Card";
import { menus } from "./Header";

export function Title() {
  const titleHeader = menus.find(menu => menu.toLowerCase() === location.pathname.replace('/', '')) || 'Home'
  
  document.title = `${titleHeader} | JISA`
  return (
    <Card >
      <h1 className="text-4xl">
        {titleHeader}
      </h1>
    </Card>
  )
}