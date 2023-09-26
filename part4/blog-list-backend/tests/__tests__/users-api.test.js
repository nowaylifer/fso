const User = require('../../models/user');
const bcrypt = require('bcrypt');
const { newValidUser } = require('../__mocks__/user-models');
const { testApp, fetchUsers, disconnectDB } = require('../test-helper');

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash('secret', 1);
    await User.create({ username: 'root', name: 'test', passwordHash });
  });

  test('fetching all users succeeds', async () => {
    const { body: user } = await fetchUsers()
      .expect(200)
      .expect('Content-Type', /application\/json/);

    expect(user[0].username).toBe('root');
  });

  test('creation succeeds with a fresh username', async () => {
    const { body: usersBefore } = await fetchUsers();

    await testApp
      .post('/api/users')
      .send(newValidUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const { body: usersAfter } = await fetchUsers();
    const usernames = usersAfter.map((user) => user.username);

    expect(usersAfter).toHaveLength(usersBefore.length + 1);
    expect(usernames).toContain(newValidUser.username);
  });
});

afterAll(disconnectDB);
