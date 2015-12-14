Meteor.startup(function() {
  Posts2.remove({});
  Users2.remove({});

  var usersNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown'];
  _.each(usersNames, function(userName) {
    var user = new User2({
      name: userName
    });
    user.save();
  });

  for (var i = 0; i < 10; i++) {
    var post = new Post2({
      title: 'Title ' + (i + 1),
      userId: Users2.findOne({}, {skip: i % usersNames.length})._id
    });
    post.save();
  }
});