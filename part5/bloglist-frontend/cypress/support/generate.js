import { build, perBuild } from '@jackfranklin/test-data-bot';
import { faker } from '@faker-js/faker';

export const userBuilder = build({
  fields: {
    name: perBuild(() => faker.person.fullName()),
    username: perBuild(() => faker.internet.userName()),
    password: perBuild(() => faker.internet.password()),
  },
});

export const blogBuilder = build({
  fields: {
    title: perBuild(() => faker.word.words()),
    author: perBuild(() => faker.person.fullName()),
    url: perBuild(() => faker.internet.url()),
  },
});
