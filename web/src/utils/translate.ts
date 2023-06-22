export function translate(text:string){
  const optional:any = {
    Required:'É obrigatório.',
    manager: 'Admin',
    judge: 'Juíz',
    coordinator: 'Coordenador',
    collective: 'Coletivo',
    individual: 'Individual'
  }
  return optional[text] ?? text
}