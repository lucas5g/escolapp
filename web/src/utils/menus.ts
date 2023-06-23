import { storageLogged } from "./storage-logged"

export function menus() {

  const logged = storageLogged()

  const menusDefault = [
    'Conta',
    'Sair'
  ]

  // console.log(logged)
  if (storageLogged().profile === 'manager') {
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

  if (logged.profile === 'coordinator') {
    return [
      'Turmas',
      'Locais',
      'Modalidades',
      'Equipes',
      'Jogos',
      'Pontos',
      ...menusDefault,
    ]
  }

  return [
    'Jogos',
    ...menusDefault
  ]
}