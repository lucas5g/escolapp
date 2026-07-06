import { menus } from "../utils/menus";
import { menuToUri, pathnameToMenuUri } from "../utils/menu-to-uri";
import { Card } from "./Card";

export function Title() {
  const pathnameMenuUri = pathnameToMenuUri(location.pathname)
  const titleHeader = menus()
    .find(menu => menuToUri(menu) === pathnameMenuUri) || 'Home'

  document.title = `${titleHeader} | EscolApp`
  return (
    <Card >
      <h1 className="text-4xl">
        {titleHeader}
      </h1>
    </Card>
  )
}
