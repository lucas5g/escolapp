export function renameLowerCase(name: string, quantity?: number) {
  if (quantity) {
    return name.charAt(0).toUpperCase() + name
      .slice(1)
      .slice(0, quantity)
      .toLowerCase()

  }
  let [firstName, secondName, thirdName] = name.toLowerCase().split(' ')
  firstName = firstName.toUpperCase().charAt(0) + firstName.slice(1)
  // secondName = secondName.length > 10 ? `${secondName.slice(0, 10)}.` : secondName
  // secondName = secondName.length < 3 ? `${secondName} ${thirdName.slice(0, 4)}` : secondName

  return `${firstName} ${secondName} ${thirdName}`

}