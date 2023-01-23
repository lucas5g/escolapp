describe('Project', () => {
  Cypress.config().baseUrl = Cypress.env('api')
  const url = 'projects'

  let accessToken = ''

  before(() => {
    cy.login().then(res => accessToken = res.accessToken )
  })

  it('List projects', () => {
    cy.request({
      url, 
      auth:{
        bearer: accessToken
      }
    }).then(({body, duration}) => {
      expect(duration).lessThan(500)
      expect(body[0]).all.keys('id', 'name', 'permission')
    })
  })

})