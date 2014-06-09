Meteor.publish('Posts', function () {
    return Posts.find();
});

Meteor.publish('PostsByTrends', function () {
    return Posts.find({},{sort : {View :-1, CommentsLength : -1},skip:0,limit : 10});
});

Meteor.publish('PostsByUsername', function (username) {
    return Posts.find({CreatedBy : username});
});

Meteor.publish('Post', function (postID) {
    return Posts.find({
        _id: postID
    });
});

Meteor.publish('CommentsByPostID', function (postID) {
    return Comments.find({
        Post_ID: postID
    });
});

Meteor.publish('NotificationsByCreatedFor', function (createdFor) {
    return Notifications.find({
        CreatedFor: createdFor
    });
});
Meteor.publish('FollowByTarget', function (target, creator) {
    return Follows.find({
        Follow: target,
        CreatedBy: creator
    });
});
Meteor.publish('FollowByCreatedBy', function (creator) {
    return Follows.find({
        CreatedBy: creator
    });
});