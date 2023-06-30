describe('Movie Flow', () => {
  it('Add new movie', () => {
    cy.visit('http://localhost:5173/')
    cy.get('#addButton').click()
    cy.get('#name').type('John Wick')
    cy.get('#description').type('An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.')
    cy.get('#image').type('https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_QL75_UX380_CR0,4,380,562_.jpg')
    cy.get('#genres').select(['Action', 'Crime'])
    cy.get('#inTheaters').check()
    cy.get('#saveButton').click()
    cy.wait(1500)
    cy.get('.swal2-confirm.swal2-styled').click()
  });
})
