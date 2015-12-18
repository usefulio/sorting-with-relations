Meteor.startup(function() {
  Posts4.remove({});
  Users4.remove({});

  var usersNames = ['Smith', 'Johnson', 'Williams', 'Jones', 'Brown'];
  _.each(usersNames, function(userName) {
    var user = new User4({
      name: userName
    });
    user.save();
  });

  for (var i = 0; i < 10; i++) {
    var post = new Post4({
      title: 'Title ' + (i + 1),
      userId: Users4.findOne({}, {skip: i % usersNames.length})._id
    });
    post.save();
  }
});