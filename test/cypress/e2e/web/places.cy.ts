describe('Place', () => {

  Cypress.config().baseUrl = Cypress.env('web')
  const user = {
    email: 'lucas@mail.com',
    password: 'qweqwe'
  }

  before(() => {
    cy.visit('/login')
    cy.get('#email').type(user.email)
    cy.get('#password').type(user.password)
    cy.get('#buttonSubmit').click()
    //  cy.url().
    cy.get('.text-4xl').should('have.text', 'Aplicação do JISA')
    cy.getAllSessionStorage().then(res => {
      
      // cy.log('res', JSON.parse(res))
    })

  })

  it('test', () => {
    cy.log("test")
    // cy.wait(2000)
    // cy.get('[href="/locais"]').click()


    // cy.wait(1000)

  })
})