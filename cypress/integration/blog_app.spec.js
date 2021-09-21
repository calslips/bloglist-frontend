describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test City',
      username: 'clogtheblog',
      password: 'test123123test'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.get('form').should('contain', 'username')
      .and('contain', 'password')
      .and('contain', 'login');
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('clogtheblog')
      cy.get('#password').type('test123123test')
      cy.get('form').submit()

      cy.get('.notice').should('contain', 'logged in successfully')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('p').should('include.text', 'logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('clogtheblog')
      cy.get('#password').type('wrongpass')
      cy.get('form').submit()

      cy.get('.notice').should('contain', 'Invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('h2').should('contain', 'log in to application')
    })
  })
});