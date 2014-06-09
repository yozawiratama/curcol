Template.signin.created = function(){};
Template.signin.rendered = function(){};
Template.signin.events({
    'submit' : function(e){
        e.preventDefault();
        var un = $('#inpUn').val();
        var pwd = $('#inpPwd').val();

        Meteor.loginWithPassword(un, pwd, function(err){
            if(err) alert(err.message);
        });
    }
});