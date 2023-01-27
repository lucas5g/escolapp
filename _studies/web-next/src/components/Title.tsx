import { Paper } from "@mui/material"
import Head from "next/head"
import { useRouter } from "next/router"
import { firstLetterUpperCase } from "../utils"
import { Card } from "./Cart"

interface Props {
  title: string
  hide?: boolean
}

export function Title({ title }: Props) {

  const router = useRouter()

  function textTitle() {

    const { asPath } = router

    if (asPath === '/') {
      return `JISA | Home`
    }

    return `JISA | ${firstLetterUpperCase(asPath.replace('/', ''))}`
    // JISA {useRouter().asPath.replace('/', ' | ').toUpperCase()}
  }

  return (
    <>
      <Head>
        <title>{textTitle()}</title>
      </Head>
      <Card>
        <h1 className="text-4xl">
          {title}
        </h1>
      </Card>
    </>
  )
}