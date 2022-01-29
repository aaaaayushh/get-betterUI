/* eslint-disable no-undef */
//landing->login page->attempt login
describe("login test", () => {
  it("visit landing page", () => {
    cy.visit("http://localhost:3000/");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get("#email")
      .type("demo@gmail.com")
      .should("have.value", "demo@gmail.com");
    cy.get("#password").type("aayush").should("have.value", "aayush");
    cy.get("#loginButton").click();
    cy.url().should("eq", "http://localhost:3000/");
  });
});
