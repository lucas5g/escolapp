describe('Groups', () => {
  Cypress.config().baseUrl = Cypress.env('web')

  const login = {
    email: 'lucas@mail.com',
    password: 'qweqwe'
  }

  it('List', () => {
    cy.visit('/login')

    cy.get('#email').type(login.email)
    cy.get('#password').type(login.password)
    cy.get('#buttonSubmit').click()
  })


})