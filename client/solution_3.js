var defineRelation = function(
  Collection, RelatedCollection, relationName, relatedFieldName
) {
  Collection._computations = Collection._computations || {};
  var comps = Collection._computations[relationName] = {};

  var stop = function(doc) {
    if (comps[doc._id]) {
      comps[doc._id].stop();
    }
  };

  var update = function(doc) {
    var setModifier = {};

    setModifier[relationName] = doc[relatedFieldName] ?
      RelatedCollection.findOne(doc[relatedFieldName]) : undefined;

    Collection._collection.update(doc._id, {
      $set: setModifier
    });
  };

  Collection.find().observe({
    added: function(newDoc) {
      stop(newDoc);
      comps[newDoc._id] = Tracker.autorun(function() {
        update(newDoc);
      });
    },
    changed: function(newDoc, oldDoc) {
      if (newDoc[relatedFieldName] !== oldDoc[relatedFieldName]) {
        stop(oldDoc);
        comps[newDoc._id] = Tracker.autorun(function() {
          update(newDoc);
        });
      }
    },
    removed: function(oldDoc) {
      stop(oldDoc);
    }
  });
};

defineRelation(Posts3, Users3, 'author', 'userId');

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