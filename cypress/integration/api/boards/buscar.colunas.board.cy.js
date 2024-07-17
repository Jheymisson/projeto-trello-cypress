/// <reference types="cypress" />

describe('Buscar colunas de um Board no Trello', () => {

    it('Deve buscar as colunas do board e salvar os dados', function() {
      cy.readFile('cypress/fixtures/boardData.json').then((boards) => {
        if (boards.length === 0) {
          cy.log('Não existem boards disponíveis para buscar colunas.');
          throw new Error('Não existem boards disponíveis para buscar colunas.');
        }
        const boardId = boards[0].id;
  
        cy.request({
          method: 'GET',
          url: `https://api.trello.com/1/boards/${boardId}/lists`,
          qs: {
            key: Cypress.env('apiKey'),
            token: Cypress.env('apiToken')
          },
        }).then(response => {
          expect(response.status).to.eq(200);
          
          const columnData = response.body.map(column => ({
            id: column.id,
            name: column.name
          }));
    
          cy.writeFile('cypress/fixtures/colunasBoard.json', columnData);
          cy.log('Dados das colunas do Board:', JSON.stringify(columnData));
        });
      });
    });
  });
  