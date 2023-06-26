import { storageLogged } from "./storage-logged"

export function menus() {

  const logged = storageLogged()

  const menusDefault = [
    // 'Conta',
    'Configurações',
    'Sair'
  ]

  // console.log(logged)
  if (logged.profile === 'admin') {
    return [
      'Turmas',
      'Locais',
      'Modalidades',
      'Equipes',
      'Jogos',
      'Pontos',
      'Usuários',
      'Unidades',
      ...menusDefault,
    ]
  }

  if(logged.profile === 'manager'){
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

  if(logged.profile === 'coordinator'){
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

  if (logged.profile === 'teacher') {
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