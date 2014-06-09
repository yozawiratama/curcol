Meteor.methods({
    FollowInsert: function (target, creator) {
        Follows.insert({
            Follow: target,
            CreatedBy: creator,
            CreatedAt: new Date()
        });
    },
    FollowRemove: function (folID) {
        Follows.remove({
            _id: folID
        });
    },
    FollowRemoveByTarget: function (target, creator) {
        Follows.remove({
            Follow: target,
            CreatedBy: creator
        });
    }
});