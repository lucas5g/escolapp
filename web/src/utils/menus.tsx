import { storageLogged } from "./storage-logged"

export function menus() {

  const logged = storageLogged()

  const menusDefault = [
    'Conta',
    'Sair'
  ]
  
  console.log(logged)
  if (storageLogged().profile === 'manager' || storageLogged().profile === 'coordinator') {
    return [
      'Turmas',
      'Locais',
      'Modalidades',
      'Equipes',
      'Jogos',
      'Pontos',
      'Usuários',
      ...menusDefault,
    ]
  }

  return [
    'Jogos',
    ...menusDefault
  ]
}