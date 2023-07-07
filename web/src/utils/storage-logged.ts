import jwtDecode from "jwt-decode";
import { UserInterface } from "../interfaces";

export function storageLogged(){
  const accessToken = localStorage.getItem('accessToken') 
  if(!accessToken)return 
  const logged:UserInterface = jwtDecode(accessToken ?? '')

  return logged

}  


