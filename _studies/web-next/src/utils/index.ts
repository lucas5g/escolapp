export function firstLetterUpperCase(text: string){

  return `${text.charAt(0).toUpperCase()}${text.slice(1)}`

}

export function sleep(ms: number){
  return new Promise(resolve => setTimeout(resolve, ms))
}

export function filter(items: any[], search: string, key='name'){
  return items?.filter((item: any) => item[key].toLowerCase().includes(search.toLocaleLowerCase().trim()))
}