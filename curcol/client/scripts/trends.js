Template.trends.created = function () {};
Template.trends.rendered = function () {};
Template.trends.events({});
Template.trends.Posts = function () {
    return Posts.find({}, {
        sort: {
            View: -1,
            CommentLength : 1
        }
    });
};