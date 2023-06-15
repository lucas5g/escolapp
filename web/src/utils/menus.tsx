import jwtDecode from "jwt-decode";
import { UserInterface } from "../interfaces";

export function menus() {
  const accessToken = localStorage.getItem('accessToken') 
  if(!accessToken) return 
  const { profile }: UserInterface = jwtDecode(accessToken) 
  if (profile === 'manager') {
    return [
      'Turmas',
      'Locais',
      'Modalidades',
      'Equipes',
      'Jogos',
      'Pontos',
      'Usuários',
      'Conta'
    ]
  }

  return [
    'Jogos',
    'Conta'
  ]
}