import { NextResponse } from "next/server"

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: { slug: string };
  },) {
  console.log({ params })
  return NextResponse.json({ id: 'qwe' })
}
