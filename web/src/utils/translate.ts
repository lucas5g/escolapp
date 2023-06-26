export function translate(text:string){
  const optional:any = {
    Required:'É obrigatório.',
    admin: 'Admin',
    judge: 'Mediador',
    coordinator: 'Coordenador',
    collective: 'Coletivo',
    individual: 'Individual',
    participative: 'Participativo',
    ranking: 'Ranking',
    'Invalid url':'Link inválido.',
    manager: 'Gerente',
    teacher: 'Professor'


  }
  return optional[text] ?? text
}