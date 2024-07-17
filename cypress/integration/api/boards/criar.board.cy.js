describe('Teste de API com Trello', () => {
    
    it('Deve acessar os boards do usuário', () => {
      const apiKey = Cypress.env('apiKey');
      const apiToken = Cypress.env('apiToken');
  
      cy.request({
        method: 'GET',
        url: `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${apiToken}`
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
    
  });
  