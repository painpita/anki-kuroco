// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (email, password) => {
    cy.intercept('POST', 'https://kurokanji.g.kuroco.app/rcms-api/6/token').as("loginReq")
    cy.get("input[name='email']")
        .type("test@user.com")
        .should("have.value", "test@user.com")
      cy.get("input[name='password']")
        .type("testtest0")
      cy.get("form")
        .submit()
    cy.wait("@loginReq")
    cy.get("div[class='card']")
 })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })