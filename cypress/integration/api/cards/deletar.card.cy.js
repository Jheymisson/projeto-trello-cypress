/// <reference types="cypress" />

describe('Deletar o primeiro card no Trello', () => {

    it('Deve deletar o primeiro card listado no arquivo', function() {
      cy.readFile('cypress/fixtures/dadosCards.json').then((cards) => {
        if (cards.length === 0) {
          cy.log('Não existem cards disponíveis para deletar.');
          throw new Error('Não existem cards disponíveis para deletar.');
        }
  
        const cardToDelete = cards[0].id;
  
        cy.request({
          method: 'DELETE',
          url: `https://api.trello.com/1/cards/${cardToDelete}`,
          qs: {
            key: Cypress.env('apiKey'),
            token: Cypress.env('apiToken')
          }
        }).then(response => {
          expect(response.status).to.eq(200);
          cy.log('Card deletado com sucesso:', cardToDelete);
  
          const remainingCards = cards.slice(1);
          cy.writeFile('cypress/fixtures/dadosCards.json', remainingCards);
        });
      });
    });

});
  