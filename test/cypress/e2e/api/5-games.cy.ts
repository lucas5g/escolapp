describe('Games', () => {
  Cypress.config().baseUrl = Cypress.env('api')

  let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1Y2FzIGRlIHNvdXNhIGFzc3Vuw6fDo28gMjIiLCJpYXQiOjE2NzUyMTc3NjcsImV4cCI6MTY3NTI2MDk2N30.y36XeIggx_Fab07up5lXnU-QYpi-jzL-Yx1ssB3B8N0"

  before(() => {
    return
    cy.login().then(res => accessToken = res.accessToken)
  })

  it('List Games', () => {
    cy.request({
      url: 'games',
      auth: {
        bearer: accessToken
      }
    }).then(({ body }) => {
      cy.log(body)
    })
  })
})


