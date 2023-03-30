describe('User', () => {

  it('User list', () => {
    cy.request('api/users')
      .then(({body}) => {
        cy.log(body)
      })
  })

  it('')
})

export {}