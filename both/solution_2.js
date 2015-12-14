Users2 = new Mongo.Collection('users2');

User2 = Astro.Class({
  name: 'User2',
  collection: Users2,
  fields: {
    name: 'string'
  }
});

Posts2 = new Mongo.Collection('posts2');

Post2 = Astro.Class({
  name: 'Post2',
  collection: Posts2,
  fields: {
    title: 'string',
    userId: 'string'
  },
  methods: {
    getAuthor: function() {
      return Users2.findOne(this.userId);
    }
  }
});