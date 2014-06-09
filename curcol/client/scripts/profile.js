Template.profile.created = function () {};
Template.profile.rendered = function () {};
Template.profile.events({
    'click #btnUnfollow': function () {
        Meteor.call('FollowRemoveByTarget', Session.get('thisusername'), Meteor.user().username);
    },
    'click #btnFollow': function () {
        Meteor.call('FollowInsert', Session.get('thisusername'), Meteor.user().username);
    }
});
Template.profile.Username = function () {
    return Session.get('thisusername');
};
Template.profile.IsOwn = function () {
    if (Meteor.user()) {
        if (Session.equals('thisusername', Meteor.user().username)) {
            return true;
        }
    }
};
Template.profile.IsFollow = function () {
    if (Meteor.user()) {
        if (Follows.find({
            Follow: Session.get('thisusername'),
            CreatedBy: Meteor.user().username
        }).count() > 0) {
            return true;
        } else {
            return false;
        }
    }
};