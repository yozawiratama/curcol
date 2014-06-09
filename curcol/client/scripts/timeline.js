Template.timeline.created = function () {};
Template.timeline.rendered = function () {};
Template.timeline.events({});
Template.timeline.Posts = function () {
    return Posts.find({}, {
        sort: {
            CreatedAt: -1
        }
    });
};