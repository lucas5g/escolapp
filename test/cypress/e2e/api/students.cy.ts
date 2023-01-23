describe('Students', () => {
  Cypress.config().baseUrl = Cypress.env('api')
  const url = '/students'
  const student = {
    ra: 'c123123',
    name: `test ${new Date().getMinutes()}`,
    course: 'MT - MATERNAL',
    group: 'IMCAM',
    codcur: 20,
    codper: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }


  let accessToken = ''
  before(() => {
    cy.login().then(res => accessToken = res.accessToken )
  })

  it('Create student', () => {
    cy.request({
      method: 'post',
      url,
      body: student,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1178)
      expect(body).deep.equal({ id: body.id, ...student })
      cy.delete({url, id:body.ra, accessToken})

    })
  })

  it('Update student', () => {
    cy.request({
      method: 'put',
      url: `${url}/C123789`,
      body: {...student, ra: 'C123789'},
      auth: {
        bearer: accessToken
      }
    }).then(({ body, duration }) => {
      // return cy.log(body)
      expect(duration).lessThan(1592)
      expect(body).deep.equal({...student, id: body.id, ra: 'C123789'})
    })
  })


  it('Show student', () => {
    cy.request({
      url: `${url}/c123789`,
      auth: {
        bearer: accessToken
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(500)
      expect(body).any.keys('id', 'ra', 'name', 'course', 'group')
    })
  })

  it('List students', () => {
    cy.request({
      url,
      auth: {
        bearer: accessToken
      }
    }).then(({ body, duration }) => {
      expect(duration).lessThan(1042)
      expect(body[0]).all.keys('id', 'ra', 'name', 'course', 'group', 'codcur', 'codper', 'createdAt', 'updatedAt')
    })
  })
})

