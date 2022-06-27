// <reference types="Cypress" /> 
describe('Favorites', () => {
    it('visits favorites, logs in, goes back to favorites, like a card, gets a 200 OK ', () => {
      cy.visit('http://localhost:8000/favorites')
      cy.get('form')
      cy.login()
      cy.get("a[href='/favorites/']")
      .click()
      cy.get("div[class='card']")
      .eq(0)
      .should("be.visible")
      cy.get("div[class='card']")
      .eq(0)
      .click()

      cy.intercept('POST', 'https://kurokanji.g.kuroco.app/rcms-api/6/unlike').as("likeReq")
      cy.get("div[class='like']")
      .click()
      cy.wait("@likeReq").then(({response})=>{
        console.log(response)
          expect(response.statusCode).to.equal(200)
      })
      cy.get("input[type=checkbox]")
      .should("be.not.checked")
        //Re click like to not change the state of the app
      cy.get("div[class='like']")
      .click()
    })
})