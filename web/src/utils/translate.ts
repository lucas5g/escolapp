export function translate(text:string){
  const optional:any = {
    Required:'É obrigatório.',
    manager: 'Admin',
    judge: 'Juíz',
    coordinator: 'Coordenador'
  }
  console.log(text)
  return optional[text] ?? text
}