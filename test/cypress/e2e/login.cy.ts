///<reference types="cypress" />
describe('login', () => {
  it('try', () => {
    cy.visit('/login')
    cy.get('#email-login').type(Cypress.env('EMAIL'))
    cy.get('#password-login').type(Cypress.env('PASSWORD'))
    cy.get('#button-login').click()

    cy.get('.text-4xl').should('have.text','Home')
  })
})

