Cypress.config().baseUrl = Cypress.env('api')
const url = '/modalities'
const modality = {
  id: 42,
  name: `Test modality ${new Date().getMinutes()} `,
  teamsQuantity: 6,
  membersQuantity: 5
}


describe('Modalities', () => {

  let accessToken = ''

  before(() => {
    cy.login().then(res => accessToken = res.accessToken )
  })


  it('Create modality', () => {
    cy.request({
      method: 'post',
      url,
      body: {...modality, id:undefined},
      auth: {
        bearer:accessToken
      },
      failOnStatusCode:false
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1591)
      expect(body).deep.equal({...modality, id: body.id})

      cy.delete({ url, id: body.id, accessToken })
    })
  })

  it('Update modality', () => {
    cy.request({
      method: 'put',
      url: `${url}/${modality.id}`,
      body: modality ,
      auth: {
        bearer:accessToken
      },
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1377)
      expect(body).deep.equal(modality)
    })
  })

  it('Show modality', () => {
    cy.request({
      url: `${url}/1`,
      auth: {
        bearer:accessToken
      },
    }).then(({ body, duration }) => {
        expect(duration).lessThan(500)
        expect(body).all.keys('id', 'name', 'teamsQuantity', 'membersQuantity')
      })
  })

  it('List Modalities', () => {
    cy.request({
      url,
      auth: {
        bearer:accessToken
      },
    }).then(({ body, duration }) => {
        expect(duration).lessThan(500)
        expect(body[0]).all.keys(['id', 'name', 'teamsQuantity', 'membersQuantity'])
      })
  })
})

