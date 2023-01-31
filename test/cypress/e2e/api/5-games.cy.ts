describe('Games', () => {
  Cypress.config().baseUrl = Cypress.env('api')

  let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1Y2FzIGRlIHNvdXNhIGFzc3Vuw6fDo28gMjIiLCJpYXQiOjE2NzUxMzEzODUsImV4cCI6MTY3NTE3NDU4NX0.Ao0ftPYePOG49AuARxFJKuOrjd1StkreG4SIOCpr4XI"

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


