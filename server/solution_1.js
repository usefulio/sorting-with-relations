Meteor.startup(function() {
  Posts1.remove({});

  var usersNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown'];

  for (var i = 0; i < 10; i++) {
    var post = new Post1({
      title: 'Title ' + (i + 1),
      author: new User1({
        name: usersNames[i % 5]
      })
    });
    post.save();
  }
});