Template.app_trends.created = function () {};

Template.app_trends.rendered = function () {};
Template.app_trends.events({
    
});

Template.app_trends.SignedIn = function () {
    if (Meteor.userId()) return true;
    else return false;
}