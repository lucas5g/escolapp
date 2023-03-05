describe('Games', () => {
  Cypress.config().baseUrl = Cypress.env('api')

  let accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Ikx1Y2FzIGRlIHNvdXNhIGFzc3Vuw6fDo28gMjIiLCJpYXQiOjE2NzUyMTc3NjcsImV4cCI6MTY3NTI2MDk2N30.y36XeIggx_Fab07up5lXnU-QYpi-jzL-Yx1ssB3B8N0"
  const url = 'games'

  const data = {
    // date:'2023-03-04T00:00:00Z',
    date: new Date().toISOString(),
    startHours:'08:00',
    endHours:'09:00',
    userId:1,
    placeId:1,
    modalityId:1

  }

  before(() => {
    // return
    cy.login().then(res => accessToken = res.accessToken)
  })

  it('Game create', () => {
    cy.request({
      method:'post',
      url,
      body:data,
      auth:{
        bearer:accessToken
      }
    }).then(({ body, status, duration}) => {
      expect(status).equal(201)
      expect(duration).lessThan(1162)
      expect(body).all.keys('comments', 'createdAt', 'date', 'endHours', 'id', 'modalityId', 'placeId', 'startHours', 'updatedAt', 'userId')
      cy.delete({id:body.id, url, accessToken})
    })
  })

  it('Game update', () => {
    cy.request({
      method:'put',
      url: `${url}/1`,
      body:data,
      auth:{
        bearer: accessToken
      },
      failOnStatusCode:false
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1229)
      expect(body).all.keys('comments', 'createdAt', 'date', 'endHours', 'id', 'modalityId', 'placeId', 'startHours', 'updatedAt', 'userId')
    })
  })

  it('Game show', () => {
    cy.request({
      url:`${url}/1`,
      auth:{
        bearer:accessToken
      }
    }).then(({ body }) => {
      expect(body).any.keys('comments', 'date', 'endHours', 'id', 'modalityId', 'placeId', 'startHours', 'userId')
    })
  })
  it('Games List' , () => {
    cy.request({
      url,
      auth: {
        bearer: accessToken
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(500)
      expect(body.length).greaterThan(1)
    })
  })
})


