Template.notifications.created = function () {};
Template.notifications.rendered = function () {};
Template.notifications.events({

});

//Template.notifications.Posts = function () {
//    return Posts.find();
//};
Template.notifications.Notifications = function () {
    return Notifications.find({}, {
        sort: {
            CreatedAt: -1
        }
    });
};