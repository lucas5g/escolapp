describe('Group', () => {

  Cypress.config().baseUrl = Cypress.env('api')

  const url = '/groups'
  const group = {
    name: `Turma test ${new Date().getMinutes()}`,
    codcur: 22,
    codper: 8,
  }

  let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1Y2FzIGRlIHNvdXNhIGFzc3Vuw6fDo28gMTQiLCJpYXQiOjE2NzQzNDgxOTUsImV4cCI6MTY3NDM5MTM5NX0.I8azMUBOGvQlOkE9HhQgoatQJl2d5kUQTBiy_DUwOls'

  before(() => {
    cy.login().then(res => accessToken = res.accessToken)
  })


  it('Create group', () => {
    cy.request({
      method: 'post',
      url,
      body: {...group, name: 'Turma test'},
      auth: {
        bearer:accessToken
      },
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1199)
      // return cy.log(body)
      expect(body).all.keys('id', 'name', 'codcur', 'codper')
      cy.delete({ url, id: body.id, accessToken })
    })
  })

  it('Update group', () => {
    cy.request({
      url: `${url}/27`,
      method: 'put',
      body: group,
      auth: {
        bearer:accessToken
      },
      failOnStatusCode:false
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1384)
      expect(body).deep.equal({id:body.id, ...group})
    })
  })

  it('Show group', () => {
    cy.request({
      url: `${url}/1`,
      failOnStatusCode: false,
      auth: {
        bearer:accessToken
      },
    }).then(({ body, duration }) => {
      expect(duration).lessThan(500)
      expect(body).all.keys('id', 'name', 'codcur', 'codper')
    })
  })

  it('List Groups', () => {
    cy.request({
      url,
      auth: {
        bearer:accessToken
      },
    }).then(({ body, duration }) => {
      expect(duration).lessThan(500)
      expect(body[0]).all.keys('id', 'name', 'codcur', 'codper')
    })
  })

})


