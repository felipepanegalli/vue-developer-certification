describe('Movie Flow', () => {
  it('Movie modal status', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#addButton').click();
    cy.get('#cancelButton').click();
  });

  it('Add movie', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#addButton').click();
    cy.get('#name').type('John Wick');
    cy.get('#description').type('An ex-hitman comes out of retirement to track down the gangsters who killed his dog and stole his car.');
    cy.get('#image').type('https://m.media-amazon.com/images/M/MV5BMTU2NjA1ODgzMF5BMl5BanBnXkFtZTgwMTM2MTI4MjE@._V1_QL75_UX380_CR0,4,380,562_.jpg');
    cy.get('#genres').select(['Action', 'Crime']);
    cy.get('#inTheaters').check();
    cy.get('#saveButton').click();
    cy.get('#swal2-html-container').contains('Movie saved with success!');
    cy.wait(1500);
    cy.get('.swal2-confirm.swal2-styled').click();
    cy.scrollTo(0, 500);
  });

  it('Edit movie', () => {
    cy.visit('http://localhost:5173/');
    cy.get('#edit-movie-1').click();
    cy.get('#name').clear().type('The Godfather 2');
    cy.get('#description').clear().type('The early life and career of Vito Corleone in 1920s New York City is portrayed, while his son, Michael, expands and tightens his grip on the family crime syndicate.');
    cy.get('#image').clear().type('https://m.media-amazon.com/images/M/MV5BMWMwMGQzZTItY2JlNC00OWZiLWIyMDctNDk2ZDQ2YjRjMWQ0XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg');
    cy.get('#genres').select(['Action', 'Crime', 'Drama']);
    cy.get('#inTheaters').check();
    cy.get('#saveButton').click();
    cy.get('#swal2-html-container').contains('Movie saved with success!');
    cy.wait(1500);
    cy.get('.swal2-confirm.swal2-styled').click();
    cy.scrollTo(0, 0);
  });
});
