Template.app_profile.created = function () {};
Template.app_profile.rendered = function () {};
Template.app_profile.events({});
Template.app_profile.IsOwn = function () {
    if (Meteor.user()) {
        if (Session.equals('thisusername', Meteor.user().username)) {
            return true;
        } 
    }
};