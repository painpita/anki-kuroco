// <reference types="Cypress" /> 
describe('Search a card', () => {
    it('searches a card, clicks the link, displays details', () => {
      cy.visit('http://localhost:8000/new',{
      headers: {
        "Accept-Encoding": "gzip, deflate",
        "Connection" : "Keep-Alive"
      },
      timeout:30000})
      cy.get('button')
      .eq(1)
      .click()
      cy.get('input')
      .eq(1)
      .type('autumn')
      cy.get("div[class='searchResultContainer']")
      .should('contain','autumn')
      cy.get("div[class='searchContent']")
      .eq(4)
      .click()
      cy.url().should("include","/card_details")

    })
})