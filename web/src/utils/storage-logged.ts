import jwtDecode from "jwt-decode";
import { UserInterface } from "../interfaces";

export function storageLogged(){
  const accessToken = localStorage.getItem('accessToken') 
  if(!accessToken) {
    location.href = '/login'
    return null 
  }
  const logged:UserInterface = jwtDecode(accessToken ?? '')

  return logged

}  


