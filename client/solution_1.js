Template.Posts1.onCreated(function() {
  var tmpl = this;

  tmpl.sortBy = new ReactiveVar('title');
  tmpl.sortOrder = new ReactiveVar(1);
});

Template.Posts1.events({
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

Template.Posts1.helpers({
  posts: function() {
    console.time(1);

    var tmpl = Template.instance();
    var sortBy = tmpl.sortBy.get();
    var sortOrder = tmpl.sortOrder.get();

    var sortSpecifier = {};
    sortSpecifier[sortBy] = sortOrder;
    var posts = Posts1.find({}, {sort: sortSpecifier});

    console.timeEnd(1);
    return posts;
  }
});