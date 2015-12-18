Users4 = new Mongo.Collection('users4');

User4 = Astro.Class({
  name: 'User4',
  collection: Users4,
  fields: {
    name: 'string'
  }
});

Posts4 = new Mongo.Collection('posts4');

Post4 = Astro.Class({
  name: 'Post4',
  collection: Posts4,
  fields: {
    title: 'string',
    userId: 'string',
  },
  loadRelations: {
    author: {
      local: 'userId',
      class: 'User4'
    }
  }
});