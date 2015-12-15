Template.Posts2.onCreated(function() {
  var tmpl = this;

  tmpl.sortBy = new ReactiveVar('title');
  tmpl.sortOrder = new ReactiveVar(1);
});

Template.Posts2.events({
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

Template.Posts2.helpers({
  posts: function() {
    console.time(2);

    var tmpl = Template.instance();
    var sortBy = tmpl.sortBy.get();
    var sortOrder = tmpl.sortOrder.get();

    // Fetch posts and corresponding authors
    var posts = Posts2.find().fetch();
    posts.forEach(function(post) {
      post.author = post.getAuthor();
    });

    // Sort posts by a give field
    posts.sort(function(a, b) {
      if (a.get(sortBy) < b.get(sortBy)) {
        return -1;
      }
      if (a.get(sortBy) > b.get(sortBy)) {
        return 1;
      }
      return 0;
    });

    // Reverse posts array if in descending order
    if (sortOrder < 0) {
      posts.reverse();
    }

    console.timeEnd(2);
    return posts;
  }
});