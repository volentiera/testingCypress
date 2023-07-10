describe('form test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
    })

    it("algo", () => {
        cy.getByData('email-input')
            .type('algo@gmail.com')
        cy.getByData('submit-button')
            .click()
        cy.getByData('success-message').should("exist").contains("algo@gmail.com")
    })

    it("algo2", () => {
        cy.getByData('email-input')
            .type('john@example.com')
        cy.getByData('submit-button')
            .click()
        cy.getByData('server-error-message').should("exist")
    })
})