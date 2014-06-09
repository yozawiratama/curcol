Meteor.methods({
    NotificationInsert: function (postID, type ,createdfor ,creator) {
        Notifications.insert({
            Post_ID: postID,
            IsRead : false,
            Type : type,
            CreatedBy: creator,
            CreatedFor: createdfor,
            CreatedAt: new Date()
        });
    },
    NotificationMakeRead: function (notifID) {
        Notifications.update({
            _id: notifID
        }, {
            $set: {
                IsRead: true
            }
        });
    }
});