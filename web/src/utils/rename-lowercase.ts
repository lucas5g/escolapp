export function renameLowerCase(name: string) {
  let [firstName, secondName, thirdName] = name.toLowerCase().split(' ')
  firstName = firstName.toUpperCase().charAt(0) + firstName.slice(1)
  secondName = secondName.length > 8 ? `${secondName.slice(0,7)}.` : secondName
  secondName = secondName.length < 3 ? `${secondName} ${thirdName.slice(0,4)}` : secondName
  // const formatName = name.charAt(0).toUpperCase() + name
  //   .slice(1)
  //   .slice(0,15)
  //   .toLowerCase()
  // return formatName

  return `${firstName} ${secondName}`

}