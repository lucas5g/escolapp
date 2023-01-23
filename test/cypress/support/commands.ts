/// <reference types="cypress" />

Cypress.Commands.add('delete', ({id, url, accessToken}) => {
  cy.request({
    url: `${url}/${id}`,
    method: 'delete',
    headers:{
      Authorization: `Bearer ${accessToken}`
    }
  }).then(({duration, status}) => {
    expect(status).equal(200)
    expect(duration).lessThan(1574)
    // expect(body).all.keys('id', 'name', 'codcur', 'codper')
  })
})

Cypress.Commands.add('login', (email = 'lucas@mail.com', password = 'qweqwe') => {
  cy.request({
    method: 'post',
    url: '/login',
    body: {
      email,
      password
    }
  }).then(({ body }) => {
    const {accessToken} = body 
    return {accessToken}
  })
})