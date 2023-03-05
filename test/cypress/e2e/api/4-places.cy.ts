
describe('Places', () => {

  Cypress.config().baseUrl = 'http://localhost:8000'
  const url = '/places'
  const place = {
    name: 'teste'
  }
  const placeUpdate = {
    id: 1,
    name: `QUADRO 01 ${new Date().getMinutes()}`
  }

  let accessToken = ''

  before(() => {
    cy.login().then(res => accessToken = res.accessToken)
  })

  it('Create place', () => {
    cy.request({
      method: 'post',
      url,
      body: place,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1193)
      expect(body).all.keys('id', 'name')
      cy.delete({ url, id: body.id, accessToken })
    })
  })

  it('Update place', () => {
    cy.request({
      method: 'put',
      url: `${url}/1`,
      body: placeUpdate,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1408)
      expect(body).deep.equal(placeUpdate)
    })
  })

  it('Show Places', () => {
    cy.request({
      url: `${url}/1`,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(500)
      expect(body).all.keys('id', 'name')
    })
  })

  it('List Places', () => {
    cy.request({
      url,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(500)
      expect(body[0]).all.keys('id', 'name')
    })
  })
})

