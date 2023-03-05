describe('Courses', () => {

  Cypress.config().baseUrl = Cypress.env('api')
  const url = '/courses'

  let accessToken = ''
  before(() => {
    cy.login().then(res => accessToken = res.accessToken)
  })

  it('List Courses', () => {
    cy.request({
      url, 
      headers:{
        Authorization: `Bearer ${accessToken}`
      }
    }).then(({ body, duration }) => {

        expect(duration).lessThan(810)
        expect(body[0]).all.keys('name', 'group', 'codcur', 'codper')
      })
  })
})

