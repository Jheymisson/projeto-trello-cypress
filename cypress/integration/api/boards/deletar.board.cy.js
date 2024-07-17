/// <reference types="cypress" />

describe('Deletar um Board no Trello', () => {

    it('Deve deletar um board usando o último ID do arquivo', function() {
      cy.readFile('cypress/fixtures/boardData.json').then((boards) => {
        if (boards.length === 0) {
          cy.log('Não existem boards disponíveis para deletar.');
          throw new Error('Não existem boards disponíveis para deletar.');
        }
        const boardToDelete = boards[boards.length - 1].id;
        cy.request({
          method: 'DELETE',
          url: `https://api.trello.com/1/boards/${boardToDelete}`,
          qs: {
            key: Cypress.env('apiKey'),
            token: Cypress.env('apiToken')
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          cy.log('Board deletado com sucesso:', JSON.stringify(response.body));
        });
      });
    });
  });
  