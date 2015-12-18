Template.Posts4.onCreated(function() {
  var tmpl = this;

  tmpl.sortBy = new ReactiveVar('title');
  tmpl.sortOrder = new ReactiveVar(1);
});

Template.Posts4.events({
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

Template.Posts4.helpers({
  posts: function() {
    console.time(4);

    var tmpl = Template.instance();
    var sortBy = tmpl.sortBy.get();
    var sortOrder = tmpl.sortOrder.get();

    var sortSpecifier = {};
    sortSpecifier[sortBy] = sortOrder;
    var posts = Posts4.find({}, {sort: sortSpecifier});

    console.timeEnd(4);
    return posts;
  }
});