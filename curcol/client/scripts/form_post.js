Template.form_post.created = function () {};
Template.form_post.rendered = function () {
    
    $('#txaPublishPost').elastic();
    $('#txaPublishPost').maxlength({
        alwaysShow: true
    });
};
Template.form_post.events({
    'click #btnPublishPost': function () {
        if ($('#txaPublishPost').val().length > 0) {
            Meteor.call('PostInsert', $('#txaPublishPost').val(), Session.get('imagepostrl'), Meteor.user().username, function (err) {
                if (err) alert(err.message);
                else {
                    $('#txaPublishPost').val("");
                    Session.set('imagepostrl', null);
                }
            });
        } else {
            alert('Tidak boleh kosong, untuk sementara gini dulu deh');
        }
    },
    'click #btnAddImages': function () {
        bootbox.prompt("Enter Image url", function (result) {
            if (result === null) {

            } else {
                Session.set('imagepostrl', result);
            }
        });
    }
});
Template.form_post.ImageUrl = function () {
    return Session.get('imagepostrl');
};
Template.form_post.IsImageUrl = function () {
    return Session.get('imagepostrl');
};