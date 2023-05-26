export function renameLowerCase(name: string) {
  // let [firstName, secondName, thirdName] = name.toLowerCase().split(' ')
  // firstName = firstName.toUpperCase().charAt(0) + firstName.slice(1)
  const formatName = name.charAt(0).toUpperCase() + name
    .slice(1)
    .slice(0,22)
    .toLowerCase()
  return formatName

  // return `${firstName} ${secondName} ${thirdName.length > 3 && thirdName}`

}