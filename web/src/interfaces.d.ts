export interface GameInterface{
  id:number
  date: string
  datetime:string
  hours: string
  startHours: string
  endHours: string
  comments?: string
  placeId: number 
  modalityId: number 
  userId: number 
  teams: number[]
  teamsStudents?:{
    id: number 
    name:string 
    students:StudentInterface[]
  }[]
  place: {
    id:number 
    name:string
  }
  user:{
    name:string
  }
  modality:{
    name:string
  }
  errors?:{
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
  membersQuantity: number 
  teamsQuantity: number
}

export interface PlaceInterface{
  id:number 
  name: string 
}

export interface UserInterface{
  name: string
  id:number 
  name:string 
  profile: 'coordinator' | 'manager' | 'judge'
  email: string 
}

export interface TeamInterface {
  id: number
  name: string
  groupId: number
  modalityId: number
  genreId: number
  students: string[] 
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
