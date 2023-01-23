declare namespace Cypress{
  interface Chainable{
    delete({id, url, accessToken}:{id:string, url:string, accessToken:string}):Chainable<Element>,
    login(email?:string, password?:string):Chainable<{ accessToken }>
  }
}