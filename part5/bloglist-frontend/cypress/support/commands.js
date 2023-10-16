import '@testing-library/cypress/add-commands';

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username,
    password,
  }).then((response) => {
    localStorage.setItem('user', JSON.stringify(response.body));
    cy.reload();
  });
});

Cypress.Commands.add('createBlog', (blog) => {
  cy.request({
    url: `${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: blog,
    headers: {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
    },
  });
});

Cypress.Commands.add('createUser', (user) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, user);
});
