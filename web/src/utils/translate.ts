export function translate(text:string){
  const optional:any = {
    Required:'É obrigatório.',
    manager: 'Admin',
    judge: 'Mediador',
    coordinator: 'Coordenador',
    collective: 'Coletivo',
    individual: 'Individual',
    participative: 'Participativo',
    ranking: 'Ranking',
    'Invalid url':'Link inválido.'


  }
  return optional[text] ?? text
}