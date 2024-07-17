/// <reference types="cypress" />

describe('Criar um novo Board no Trello', () => {
    
    it('Deve criar um novo board com um nome dinâmico', function() {
      const uniqueSuffix = Date.now() + Math.random().toString(15).substring(2, 15);
      const boardName = `Board-${uniqueSuffix}`;
  
      cy.request({
        method: 'POST',
        url: `https://api.trello.com/1/boards/?name=${encodeURIComponent(boardName)}`,
        qs: {
          key: Cypress.env('apiKey'),
          token: Cypress.env('apiToken')
        },

      }).then(response => {
        expect(response.status).to.eq(200);
        cy.log('Board criado com sucesso:', JSON.stringify(response.body));
      });
    });
});
  