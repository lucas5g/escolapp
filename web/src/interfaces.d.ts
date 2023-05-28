export interface GameInterface{
  id:number
  date: string
  startHours: string
  endHours: string
  comments?: string
  placeId: number 
  modalityId: number 
  userId: number 
  teams: TeamInterface[]
  errors:{
    id?:string
    date?: string
    startHours?: string
    endHours?: string
    comments?: string
    placeId?: string 
    modalityId?: string
    userId?:string
    teams?:string 
  }
}

export interface ModalityInterface{
  id: number 
  name: string 
}

export interface PlaceInterface{
  id:number 
  name: string 
}

export interface UserInterface{
  id:number 
  name:string 
  profile: 'coordinator' | 'manager' | 'judge'
}

export interface TeamInterface{
  id:number 
  name: string 
  modalityId: number 
  groupId: number 
  genreId: number 
  
}

export interface GroupInterface {
  id: number
  name: string
  codcur: number
  codper: number

}
export interface StudentInterface {
  name: string
  ra: string
  group:string
  // codcur: number
  // codper: number
}
