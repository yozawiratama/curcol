Router.map(function () {
    this.route('home', {
        path: '/',
        template: 'app',
        waitOn: function () {
            return [];
        },
        onBeforeAction: function () {},
        onAfterAction: function () {
            if (Meteor.user()) {
                Meteor.subscribe('NotificationsByCreatedFor', Meteor.user().username);
                var followHandle = Meteor.subscribe('FollowByCreatedBy', Meteor.user().username);
                if (followHandle.ready()) {
                    Meteor.subscribe('PostsByUsername', Meteor.user().username, function (err) {
                        if (err) alert(err.message);
                    });
                    var fol = Follows.find().fetch();
                    for (var ii = 0; ii < fol.length; ii++) {
                        Meteor.subscribe('PostsByUsername', fol[ii].Follow, function (err) {
                            if (err) alert(err.message);
                        });
                    }
                }

            }
        }
    });
    this.route('post', {
        path: '/n',
        template: 'app_notifications',
        waitOn: function () {
            return [Meteor.subscribe('NotificationsByCreatedFor', Meteor.user().username)];
        },
        onBeforeAction: function () {
            var notif = Notifications.find().fetch();
            for (var ii = 0; ii < notif.length; ii++) {
                Meteor.subscribe('Post', notif[ii].Post_ID);
            }
        }
    });
    this.route('trending', {
        path: '/trending',
        template: 'app',
        waitOn: function () {
            return [Meteor.subscribe('PostsByTrends')];
        },
        onBeforeAction: function () {
            if (Meteor.user()) {
                Meteor.subscribe('NotificationsByCreatedFor', Meteor.user().username);
            }
        }
    });
    this.route('profile', {
        path: '/:username',
        template: 'app_profile',
        waitOn: function () {
            return [Meteor.subscribe('PostsByUsername', this.params.username)];
        },
        onBeforeAction: function () {
            Session.set('thisusername', this.params.username);
        },
        onAfterAction: function () {
            if (Meteor.userId()) {
                Meteor.subscribe('NotificationsByCreatedFor', Meteor.user().username);
                if (this.params.username != Meteor.user().username)
                    Meteor.subscribe('FollowByTarget', this.params.username, Meteor.user().username);
            }
        }
    });
    this.route('post', {
        path: '/p/:postid',
        template: 'app_post',
        waitOn: function () {
            return [Meteor.subscribe('Post', this.params.postid), Meteor.subscribe('NotificationsByCreatedFor', Meteor.user().username)];
        },
        onBeforeAction: function () {

        }
    });

});