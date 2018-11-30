describe('My first cypress test', () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from
        // failing the test
        return false
      })

    it('should go to the repo', async () => {
        let approvals;
        const accessToken = "token 15e1f98b33224914a24e4a7e36273304a6858ff5"
        const url = "https://github.com/asosteam";
        const username = "asos-oliverwilson";
        const password = "London20G";
        const options = {
            auth: { bearer: accessToken},
            username: username,
            password: password
        };

        // visit github and sign in
        cy.visit(url, options)
        cy.contains("Sign").click()
        cy.get("#login_field").type(username)
        cy.get("#password").type(password)
        cy.get("form").submit()

        // now go to repo page
        cy.get("#your-repos-filter").type("Saved Lists")
        cy.get("[data-results-container=org-repositories]").submit()
        cy.contains("asos-web-saved-lists").click()
        cy.get("a[href*='lists/pulls']").click()        

        cy.get("#issue-id-51").click()
        cy.get("span[aria-label*='approved these changes']").then($approvals => {
            approvals = $approvals
            cy.get("a[title*='This PR has one dev approval']").eq(2).click()
            cy.get("#label-filter-field").type(approvals)
        })
    });
});