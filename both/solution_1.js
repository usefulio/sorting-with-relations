User1 = Astro.Class({
  name: 'User1',
  fields: {
    name: 'string'
  }
});

Posts1 = new Mongo.Collection('posts1');

Post1 = Astro.Class({
  name: 'Post1',
  collection: Posts1,
  fields: {
    title: 'string',
    author: {
      type: 'object',
      nested: 'User1'
    }
  }
});