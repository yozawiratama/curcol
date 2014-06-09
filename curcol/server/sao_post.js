Meteor.methods({
    'PostInsert': function (content, image, username) {
        Posts.insert({
            Content: content,
            Image: image,
            View: 0,
            CommentsLength : 0,
            CreatedAt: new Date(),
            CreatedBy: username,
            LastModifiedAt: new Date()
        });
    },
    'PostRemove': function (postID) {
        Posts.remove({
            _id: postID
        });
        Comments.remove({
            Post_ID: postID
        });
    },
    'PostUpdate': function (postID, content, image) {
        Posts.update({
            _id: postID
        }, {
            $set: {
                Content: content,
                Image: image,
                LastModifiedAt: new Date()
            }
        });
    },
    'PostUpdateView': function (postID) {
        Posts.update({
            _id: postID
        }, {
            $inc: {
                View: 1
            }
        });
    },
    'PostUpdateCommentsLength': function (postID) {
        Posts.update({
            _id: postID
        }, {
            $inc: {
                CommentsLength: 1
            }
        });
    },
});