import { repeat } from "cypress/types/lodash"

describe('Team', () => {
  let accessToken = ''

  before(() => {
    cy.request({
      method: 'post',
      url: 'login',
      failOnStatusCode: false,
      body: {
        email: Cypress.env('EMAIL'),
        password: Cypress.env('PASSWORD')
      }
    }).then(({ body }) => {
      accessToken = body.accessToken
    })
  })

  it('Flow create teams', () => {

    for (let i = 0; i <= 3; i++) {
      flow(accessToken)
    }

  })
})
function flow(accessToken: string) {
  cy.request({
    url: 'unities',
    auth: {
      bearer: accessToken
    }
  }).then(({ body, duration }) => {
    expect(duration).lessThan(900)
    cy.log(body)
  })

  cy.request({
    url: 'groups',
    auth: {
      bearer: accessToken
    }
  })
    .then(({ body, duration }) => {
      expect(duration).lessThan(1075)
      cy.log(body)
    })

  cy.request({
    url: 'modalities',
    auth: {
      bearer: accessToken
    }
  })
    .then(({ body, duration }) => {
      expect(duration).lessThan(900)
      cy.log(body)
    })


  cy.request({
    url: 'students?unity=contagem',
    auth: {
      bearer: accessToken
    }
  })
    .then(({ body, duration }) => {
      expect(duration).lessThan(1492)
      cy.log(body)
    })


  cy.request({
    url: 'teams',
    auth: {
      bearer: accessToken
    }
  }).then(({ body, duration }) => {
      expect(duration).lessThan(1949)
      cy.log(body)
    })

  cy.request({
    method: 'post',
    url: 'teams',
    body: {
      name: 'Team delete 3',
      modalityId: 1,
      groupId: 78,
      genreId: 3,
      students: [
        'C123123',
        'C321321'
      ]
    },
    auth: {
      bearer: accessToken
    }
  }).then(({ body, duration }) => {
    expect(duration).lessThan(1731)
    cy.request({
      method: 'delete',
      url: `teams/${body.id}`,
      auth: {
        bearer: accessToken
      }
    }).then(({ duration }) => {
      expect(duration).lessThan(2106)
    })
  })


}