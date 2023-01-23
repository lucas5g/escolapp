export function idToStringProfile(id:string){
  const profile:any = {
    '1':'manager',
    '2': 'judge',
    '3': 'coordinator',
    '4': 'representative'
  }
  return profile[id]
}