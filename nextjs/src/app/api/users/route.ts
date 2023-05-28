import { NextRequest as req ,NextResponse as res} from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id') 
  
  console.log({id})
  // return NextResponse.json({
  //   message: 'Lista de usuários'
  // })
  return res.json({message: 'Lista de usuários'})
}