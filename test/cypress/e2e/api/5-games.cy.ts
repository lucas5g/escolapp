describe('Games', () => {
  Cypress.config().baseUrl = Cypress.env('api')

  let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1Y2FzIGRlIHNvdXNhIGFzc3Vuw6fDo28gMjIiLCJpYXQiOjE2NzQ3ODYxMDksImV4cCI6MTY3NDgyOTMwOX0.fx1Qzx5cM3gFZhmB7osJPsJrsdQqqQs8Ky-ZnZd6Sak"

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


