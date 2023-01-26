
describe('Teams', () => {
  Cypress.config().baseUrl = Cypress.env('api')
  const url = 'teams'
  const team = {
    name: `test - equipe ${new Date().getMinutes()}`,
    modalityId: 11,
    groupId: 2,
    genreId: 3
  }



  let accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1Y2FzIGRlIHNvdXNhIGFzc3Vuw6fDo28gMjIiLCJpYXQiOjE2NzQ2MjE3NzMsImV4cCI6MTY3NDY2NDk3M30.TFA_uMB8oxnvBxxws_l_NzEOln_0qm-IzJP0aJXyINk'
  before(() => {
    // return
    cy.login().then(res => accessToken = res.accessToken)
  })

  it('Create team', () => {
    cy.request({
      url,
      method: 'post',
      body: { ...team, name: 'delete test', },
      auth: {
        bearer: accessToken
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1448)
      expect(body).deep.equal({ ...team, id: body.id, name: 'delete test', })
      cy.delete({ id: body.id, url, accessToken })
    })
  })

  it('Update team', () => {
    cy.request({
      url: `${url}/21`,
      method: 'put',
      body: team,
      auth: {
        bearer: accessToken
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1549)
      expect(body).deep.equal({ id: 21, ...team })
    })
  })

  it('Show Team', () => {
    cy.request({
      url: `${url}/1`,
      auth: {
        bearer: accessToken
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(500)
      expect(body).all.keys('id', 'name', 'modalityId', 'groupId', 'genreId')

    })
  })

  it('List Teams', () => {
    cy.request({
      url,
      auth: {
        bearer: accessToken
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1900)
      // cy.log(body)
      // return
      expect(body[0]).all.keys('id', 'name', 'genre', 'group', 'modality')

      // expect(body[0]).all.keys('id', 'name', 'modalityId', 'groupId', 'genreId', 'genre', 'group', 'modality')
    })
  })
})

