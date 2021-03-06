Users3 = new Mongo.Collection('users3');

User3 = Astro.Class({
  name: 'User3',
  collection: Users3,
  fields: {
    name: 'string'
  }
});

Posts3 = new Mongo.Collection('posts3');

Post3 = Astro.Class({
  name: 'Post3',
  collection: Posts3,
  fields: {
    title: 'string',
    userId: 'string',
    author: {
      type: 'object',
      nested: 'User3'
    }
  }
});