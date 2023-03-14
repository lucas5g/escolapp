const messagesTranslate = (message:string)=> {
  const messageObject:any = {
    'Expected date, received string':'Data esperada, texto recebido.',
    'Required':'é obrigatório.',
    'Invalid datetime':'deve ser data horas.',
    'Invalid date':'deve ser data.'
  }
  return messageObject[message]
}

export function errorsMessages(error:any){

  const errors = error.errors.reduce((acc:string, error:any) => {
    // message += `${error.path} ${messagesTranslate(error.message)}\n`
    return acc += `${error.path} ${error.message}\n`
  },'')

  console.log(errors)
  return errors
}