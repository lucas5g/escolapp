import { storageLogged } from "./storage-logged"

export function menus() {

  const menusDefault = [
    'Conta',
    'Sair'
  ]
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

  return [
    'Jogos',
    ...menusDefault
  ]
}