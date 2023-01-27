import { NextRequest, NextResponse } from "next/server"
import { useFetch } from "./utils/useFetch"

export async function middleware(req: NextRequest) {

  // return NextResponse.next()
  // console.log('middleare')


  // const { data, error } = useFetch('/me')

  // console.log({error})
  // return 

  // const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${token?.email}`)
  // const me = await response.json()

  // console.log({ token, me })



  // if (req.nextUrl.pathname.startsWith('/api') && !me) {

  //   return NextResponse.rewrite(`${process.env.NEXT_PUBLIC_API_URL}/error/permission`)

  // }


  return NextResponse.next()

}