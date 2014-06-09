Template.post.created = function () {

    Session.set('ispostedit' + this.data._id, false);
    Session.set('imagepostrl' + this.data._id, this.data.Image);
    Session.set('isselected' + this.data._id, false);
};
Template.post.rendered = function () {
    $('#txaPost' + this.data._id).elastic();
    $('#txaPost' + this.data._id).maxlength({
        alwaysShow: true
    });
};
Template.post.CreatedAt = function () {
    return new Date(this.CreatedAt).toDateString();
};
Template.post.Comments = function () {

    return Comments.find({
        Post_ID: this._id
    });
};
Template.post.IsEdit = function () {
    return Session.get('ispostedit' + this._id);
};
Template.post.IsDisabledForEdit = function () {
    if (Session.get('ispostedit' + this._id))
        return "";
    else return "disabled";
};
Template.post.IsCreator = function () {
    if (Meteor.user())
        return (Meteor.user().username == this.CreatedBy);
};
Template.post.IsImageUrl = function () {
    if (this.Image)
        return true;
    else return false;
};
Template.post.ImageUrl = function () {
    return this.Image;
};

Template.post.IsSelected = function () {
    return Session.get('isselected' + this._id);
};
Template.post.Selected = function () {
    return Session.get('isselected' + this._id) ? "selected" : "no-margin";
};
Template.post.Unread = function () {
    var notif = Notifications.find({
        Post_ID: this._id,
        IsRead: false
    }).fetch();
    if (Session.get('isselected' + this._id)) {
        for (var ii = 0; ii < notif.length; ii++) {
            Meteor.call('NotificationMakeRead', notif[ii]._id);
        }
        return "";
    } else {
        return (notif.length > 0) ? "unread" : "";
    }


};

Template.post.events({
    'keypress input': function (e, tmpl) {
        var id = this._id;
        if (e.keyCode == 13) {
            Meteor.call('CommentInsert', $('#inpComment' + id).val(), id, Meteor.user().username, function (err, data) {
                if (err) alert(err.message);
                else {
                    $('#inpComment' + id).val("");

                }
            });
            var com = Comments.find({
                Post_ID: this._id
            }, {
                sort: {
                    CreatedBy: 1
                }
            }).fetch();
            var temp1;
            var temp2 = false;

            for (var ii = 0; ii < com.length; ii++) {
                if (temp1 != com[ii].CreatedBy && Meteor.user().username != com[ii].CreatedBy) {
                    console.log("sene");
                    temp1 = com[ii].CreatedBy;
                    Meteor.call('NotificationInsert', this._id, DataRef.Comment, com[ii].CreatedBy, Meteor.user().username, function (err) {
                        if (err) alert(err.message);
                    });
                }
                if (com[ii].CreatedBy == this.CreatedBy)
                    temp2 = true;
            }
            if (!temp2) {
                if (Meteor.user().username != this.CreatedBy) {
                    //                temp1 = com[ii].CreatedBy;
                    Meteor.call('NotificationInsert', this._id, DataRef.Comment, this.CreatedBy, Meteor.user().username, function (err) {
                        if (err) alert(err.message);
                    });
                }
            }
            if (this.CreatedBy != Meteor.user().username)
                Meteor.call('PostUpdateCommentsLength', this._id);
        }

    },
    'click #btnDelete': function () {
        Meteor.call('PostRemove', this._id);
    },
    'click #btnEdit': function () {
        Session.set('ispostedit' + this._id, true);
    },
    'click #btnUpdatePost': function () {
        var id = this._id;
        Meteor.call('PostUpdate', id, $('#txaPost' + id).val(), Session.get('imagepostrl' + id), function (err) {
            if (err) alert(err.message);
            else {
                console.log(Session.get('ispostedit' + id));
                Session.set('ispostedit' + id, false);
                console.log(Session.get('ispostedit' + id));
            }
        });
    },
    'click #btnReport': function () {
        alert('Still under development');
    },
    'click .card2-content': function () {
        Meteor.subscribe('CommentsByPostID', this._id);
        if (Session.get('isselected' + this._id)) Session.set('isselected' + this._id, false);
        else Session.set('isselected' + this._id, true);
        var notif = Notifications.find({
            Post_ID: this._id,
            IsRead: false
        }).fetch();
        for (var ii = 0; ii < notif.length; ii++) {
            Meteor.call('NotificationMakeRead', notif[ii]._id);
        }
        if (this.CreatedBy != Meteor.user().username)
            Meteor.call('PostUpdateView', this._id);

    }
});



Template.comment.events({
    'click #btnDelete': function () {
        Meteor.call('CommentRemove', this._id);
    }
});
Template.comment.IsCreator = function () {
    if (this.CreatedBy == Meteor.user().username)
        return true;
};


Template.notification.CreatedAt = function () {
    return new Date(this.CreatedAt).toLocaleDateString() + " " + new Date(this.CreatedAt).toLocaleTimeString();
};
//Template.notification.IsRead = function () {
//    return this.
//};