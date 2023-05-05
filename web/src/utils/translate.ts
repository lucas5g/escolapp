export function translate(text:string){
  const optional:any = {
    Required:'É obrigatório.'
  }

  return optional[text]
}