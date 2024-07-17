/// <reference types="cypress" />

describe('Buscar dados dos Boards no Trello', () => {

  it('Deve obter os IDs e nomes dos boards', () => {
    cy.request({
      method: 'GET',
      url: 'https://api.trello.com/1/members/me/boards',
      qs: {
        key: Cypress.env('apiKey'),
        token: Cypress.env('apiToken')
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      const boards = response.body;

      if (boards.length === 0) {
        throw new Error('Não existem dados disponíveis.');
      }

      const boardData = boards.map(board => ({
        id: board.id,
        name: board.name
      }));

      cy.writeFile('cypress/fixtures/boardData.json', boardData).then(() => {
        cy.log('Dados dos Boards salvos:', JSON.stringify(boardData));
      });
      
    });
  });


});
