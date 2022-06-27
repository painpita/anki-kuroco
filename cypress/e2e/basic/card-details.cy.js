describe('My First Test', () => {
    it('logs in, visits mycards, checks the content of a card', () => {
      cy.visit('http://localhost:8000',{
      headers: {
        "Accept-Encoding": "gzip, deflate",
        "Connection" : "Keep-Alive"
      },
    timeout:30000})
      cy.contains('My cards').click()
      cy.url().should("include","/profile")
      cy.get("input[name='email']")
        .type("test@user.com")
        .should("have.value", "test@user.com")
      cy.get("input[name='password']")
        .type("testtest0")
      cy.get("form")
        .submit()
      cy.get("div[class='card']")
        .eq(9)
        .should('be.visible')
      cy.get("div[class='card']")
        .first()
        .click()
      cy.url().should("include","/card_details/")
      cy.contains(/Meanings\ :\ \w+/)
      cy.contains(/Kunyomi readings\ :\ \w+/)
      cy.contains(/Onyomi readings\ :\ \w+/)
      cy.contains(/Grade : \w+/)
    })
  })