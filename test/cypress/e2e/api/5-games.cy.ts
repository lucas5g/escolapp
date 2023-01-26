describe('Games', () => {
  it('List Games', () => {
    cy.request('/api/games')
      .then(({ body }) => {
        cy.log(body)
      })
  })
})


