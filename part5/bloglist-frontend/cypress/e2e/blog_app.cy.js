import { userBuilder, blogBuilder } from '../support/generate';

describe('Blog app', () => {
  const user = userBuilder.one();

  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.createUser(user);
    cy.visit('/');
  });

  it('Login form is shown', () => {
    cy.findByText(/log in to application/i);
    cy.findByRole('textbox', { name: /username/i });
    cy.findByRole('textbox', { name: /password/i });
    cy.findByRole('button', { name: 'login' });
  });

  it('Blogs are ordered according to likes with the blog with the most likes being first', () => {
    cy.login(user);
    const blogs = blogBuilder.many(4);
    blogs.map((blog) => cy.createBlog(blog));
    cy.reload();

    cy.findAllByRole('button', { name: /show/i }).eq(0).click();
    cy.findByRole('button', { name: /like/i }).click();

    cy.findAllByTestId('blog').eq(3).should('contain', blogs[0].title);
  });

  describe('Logging in', () => {
    it('succeds with correct credentials', () => {
      cy.findByRole('textbox', { name: /username/i }).type(user.username);
      cy.findByRole('textbox', { name: /password/i }).type(user.password);
      cy.findByRole('button', { name: 'login' }).click();
      cy.findByText(/successful login/i);
      cy.findByText(user.name, { exact: false });
      cy.findByRole('button', { name: /logout/i });
      cy.window()
        .its('localStorage.user')
        .then((string) => {
          const user = JSON.parse(string);
          expect(user.token).to.be.string;
        });
    });

    it('fails with wrong credentials', () => {
      const fakeUser = userBuilder.one();

      cy.findByRole('textbox', { name: /username/i })
        .as('usernameInput')
        .type(fakeUser.username);

      cy.findByRole('textbox', { name: /password/i })
        .as('passwordInput')
        .type(fakeUser.password);

      cy.findByRole('button', { name: 'login' }).click();
      cy.findByText(/invalid username or password/i);
      cy.findByRole('button', { name: /login/i });

      cy.get('@usernameInput').should('have.value', fakeUser.username);
      cy.get('@passwordInput').should('have.value', fakeUser.password);
      cy.window().its('localStorage.user').should('not.exist');
    });
  });

  describe('When logged in', () => {
    beforeEach(() => {
      cy.login(user);
    });

    it('a blog can be created', () => {
      const blog = blogBuilder.one();
      cy.findByRole('button', { name: /create blog/i }).click();
      cy.findByRole('textbox', { name: /title/i }).as('titleInput').type(blog.title);
      cy.findByRole('textbox', { name: /author/i })
        .as('authorInput')
        .type(blog.author);

      cy.findByRole('textbox', { name: /url/i }).as('urlInput').type(blog.url);
      cy.findByRole('button', { name: /create/i }).click();
      cy.findByText(/blog created/i);
      cy.findByText(`${blog.title} ${blog.author}`, { exact: false });
      cy.findByRole('button', { name: /show/i });

      cy.findByText(blog.url, { exact: false }).should('not.exist');
      cy.findByText(/likes/i).should('not.exist');

      cy.get('@titleInput').should('not.have.value');
      cy.get('@authorInput').should('not.have.value');
      cy.get('@urlInput').should('not.have.value');
    });
  });

  describe('Blog deletion', () => {
    const blog = blogBuilder.one();

    beforeEach(() => {
      cy.login(user);
      cy.createBlog(blog);
      cy.reload();
    });

    it('succeeds when the user created that blog is logged in', () => {
      cy.findByRole('button', { name: /show/i }).click();
      cy.findByRole('button', { name: /delete/i }).click();
      cy.findByText(blog.author, { exact: false }).should('not.exist');
    });

    it('fails when the user created that blog is not logged in', () => {
      cy.findByRole('button', { name: /logout/i }).click();
      cy.findByRole('button', { name: /show/i }).as('showBtn').click();
      cy.findByRole('button', { name: /delete/i })
        .as('deleteBtn')
        .click();
      cy.findByText(/error/i);
      cy.findByText(blog.author, { exact: false });

      const newUser = userBuilder.one();
      cy.createUser(newUser);
      cy.login(newUser);

      cy.get('@showBtn').click();
      cy.get('@deleteBtn').click();
      cy.contains(/error/i);
      cy.contains(blog.author);
    });
  });
});
