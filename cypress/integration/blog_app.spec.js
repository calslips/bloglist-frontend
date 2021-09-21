describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test City',
      username: 'clogtheblog',
      password: 'test'
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
      cy.get('#password').type('test')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'clogtheblog', password: 'test'})
    })

    it('A blog can be created', function() {
      cy.contains('create new blog').click()
      cy.get('#title').type('Test Title')
      cy.get('#author').type('Test Author')
      cy.get('#url').type('https://blog.testblog.com')
      cy.get('form').submit()

      cy.get('.notice').should('include.text', 'added')
      cy.get('.blog').should('contain', 'Test Title - Test Author')
    })
  })
});