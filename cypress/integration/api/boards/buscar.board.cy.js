/// <reference types="cypress" />

describe('Buscar um Board pelo ID no Trello', () => {

    it('Deve buscar um board usando um ID aleatório', function() {
      cy.readFile('cypress/fixtures/boardData.json').then((boards) => {
        if (boards.length === 0) {
          throw new Error('Não existem boards disponíveis para buscar.');
        }
  
        const randomBoard = boards[Math.floor(Math.random() * boards.length)];
        const boardId = randomBoard.id;  
  
        cy.request({
          method: 'GET',
          url: `https://api.trello.com/1/boards/${boardId}`,
          qs: {
            key: Cypress.env('apiKey'),
            token: Cypress.env('apiToken')
          },
          headers: {
            'Accept': 'application/json'
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          cy.log('Detalhes do Board:', JSON.stringify(response.body));
          cy.log(`Nome do Board: ${response.body.name}`);
          cy.log(`Descrição do Board: ${response.body.desc || 'Sem descrição'}`);
          cy.log(`URL do Board: ${response.body.url}`);
        });
      });
    });
  });
  