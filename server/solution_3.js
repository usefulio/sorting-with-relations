Meteor.startup(function() {
  Posts3.remove({});
  Users3.remove({});

  var usersNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown'];
  _.each(usersNames, function(userName) {
    var user = new User3({
      name: userName
    });
    user.save();
  });

  for (var i = 0; i < 10; i++) {
    var post = new Post3({
      title: 'Title ' + (i + 1),
      userId: Users3.findOne({}, {skip: i % usersNames.length})._id
    });
    post.save();
  }
});