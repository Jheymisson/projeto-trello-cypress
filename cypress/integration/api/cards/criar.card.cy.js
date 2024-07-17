/// <reference types="cypress" />

describe('Criar cards no Trello', () => {
    
    it('Deve criar cards em todas as colunas listadas e salvar seus IDs', function() {
      cy.readFile('cypress/fixtures/colunasBoard.json').then((colunas) => {
        if (colunas.length === 0) {
          cy.log('Não existem colunas disponíveis para criar cards.');
          throw new Error('Não existem colunas disponíveis para criar cards.');
        }
  
        const cardIds = [];
  
        colunas.forEach(coluna => {
          const uniqueSuffix = Date.now() + '-' + Math.random().toString(36).substring(2, 15);
          const nomeCard = `Card-${uniqueSuffix}`;
  
          cy.request({
            method: 'POST',
            url: `https://api.trello.com/1/cards`,
            qs: {
              idList: coluna.id,
              name: nomeCard,
              key: Cypress.env('apiKey'),
              token: Cypress.env('apiToken')
            },
          }).then(response => {
            expect(response.status).to.eq(200);
            cy.log(`Card criado com sucesso na coluna ${coluna.name} com nome ${nomeCard}:`, JSON.stringify(response.body));
  
            cardIds.push({ id: response.body.id, name: nomeCard });
  
            if (cardIds.length === colunas.length) {
              cy.writeFile('cypress/fixtures/dadosCards.json', cardIds);
            }
          });
        });
      });
    });

});
  