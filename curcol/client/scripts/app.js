Template.app.created = function () {};

Template.app.rendered = function () {};
Template.app.events({
    
});

Template.app.SignedIn = function () {
    if (Meteor.userId()) return true;
    else return false;
}