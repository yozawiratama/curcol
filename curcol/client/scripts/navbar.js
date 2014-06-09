Template.navbar.created = function () {};
Template.navbar.rendered = function () {};
Template.navbar.events({
    'click #btnSignOut': function () {
        Meteor.logout();
    }
});
Template.navbar.Username = function () {
    if (Meteor.user())
        return Meteor.user().username;
};
Template.navbar.AmountUnreadNotif = function () {
    return Notifications.find({
        IsRead: false
    }).count();
};