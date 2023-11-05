export interface GameInterface {
  id: number
  date: string
  datetime: string
  hours: string
  startHours: string
  endHours: string
  comments?: string
  place_id: number
  modality_id: number
  user_id: number
  teams: {
    id: number
    name: string | undefined
    points: number
    goals: number 
    fairPlay: number
    modality_id: number
    students:string[]|undefined
  }[],
  place: string|undefined
  user: string|undefined
  modality: name
  errors?: {
    id?: string
    date?: string
    startHours?: string
    endHours?: string
    comments?: string
    placeId?: string
    modalityId?: string
    userId?: string
    teams?: string
  }
}

export interface ModalityInterface {
  id: number
  name: string
  membersQuantity: number
  teamsQuantity: number
}
export interface PlaceInterface {
  id: number
  name: string
}
export interface UserInterface {
  name: string
  id: number
  name: string
  profile: 'coordinator' | 'manager' | 'judge' | 'admin' | 'teacher'
  email: string
  unity_id: number
}
export interface TeamInterface {
  id: number
  name: string
  group: string
  modality_id: number
  genre: number
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
  group: string
  // codcur: number
  // codper: number
}

export interface ChangeInputInterface {
  teamId: number
  field: 'fairPlay' | 'goals' | 'points'
  value: number | underfined
}

export interface UnityInterface {
  id: number
  name: string
}

export interface SetupInterface {
  id: number
  documentLink: string

}