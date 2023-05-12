export interface GameInterface{
  id:number
  date: string
  startHours: string
  endHours: string
  comments: null
  placeId: number 
  modalityId: number 
  userId: number 
  teams:[]
  errors:{
    
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