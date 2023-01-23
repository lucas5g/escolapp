
describe('Teams', () => {
  Cypress.config().baseUrl = Cypress.env('api')
  const url = 'teams'
  const team = {
    name: `test - equipe ${new Date().getMinutes()}`,
    modalityId: 11,
    groupId: 2,
    genreId: 3
  }



  let accessToken = ''
  before(() => {
    cy.login().then(res => accessToken = res.accessToken)
  })

  it('Create team', () => {
    cy.request({
      url,
      method: 'post',
      body: {...team, name: 'delete test',},
      auth: {
        bearer: accessToken
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1188)
      expect(body).deep.equal({...team, id: body.id, name: 'delete test',})
      cy.delete({id: body.id, url, accessToken})
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
      expect(body).deep.equal({id: 21, ...team})
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
      expect(duration).lessThan(500)
      expect(body[0]).all.keys('id', 'name', 'modalityId', 'groupId', 'genreId')
    })
  })
})

