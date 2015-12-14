Template.Posts3.onCreated(function() {
  var tmpl = this;

  tmpl.sortBy = new ReactiveVar('title');
  tmpl.sortOrder = new ReactiveVar(1);
});

Template.Posts3.events({
  'click th[data-sortby]': function(e, tmpl) {
    var sortBy = e.currentTarget.getAttribute('data-sortby');

    if (tmpl.sortBy.get() === sortBy) {
      tmpl.sortOrder.set(-tmpl.sortOrder.get());
    } else {
      tmpl.sortBy.set(sortBy);
      tmpl.sortOrder.set(1);
    }
  }
});

Template.Posts3.helpers({
  posts: function() {
    console.time(3);
    if (Users3.find().count() > 0) {
      Posts3.loadRelated(function(post) {
        post.author =
          post.author || Users3.findOne(post.userId, {transform: null});
      });
    }

    var tmpl = Template.instance();
    var sortBy = tmpl.sortBy.get();
    var sortOrder = tmpl.sortOrder.get();

    var sortSpecifier = {};
    sortSpecifier[sortBy] = sortOrder;
    var posts = Posts3.find({}, {sort: sortSpecifier});
    console.timeEnd(3);
    return posts;
  }
});