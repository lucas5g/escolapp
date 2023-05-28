export function renameLowerCase(name: string) {
  let [firstName, secondName] = name.toLowerCase().split(' ')
  firstName = firstName.toUpperCase().charAt(0) + firstName.slice(1)
  secondName = secondName.length > 8 ? `${secondName.slice(0,7)}.` : secondName
  // const formatName = name.charAt(0).toUpperCase() + name
  //   .slice(1)
  //   .slice(0,15)
  //   .toLowerCase()
  // return formatName

  return `${firstName} ${secondName}`

}