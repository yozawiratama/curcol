Template.signup.created = function () {
};
Template.signup.rendered = function () {
};
Template.signup.events({
    'submit': function (e) {
        e.preventDefault();
        var un = $('#inpRegUn').val();
        var email = $('#inpRegEmail').val();
        var pwd = $('#inpRegPwd').val();
        var repwd = $('#inpRegRePwd').val();
        if (pwd === repwd) {
            Accounts.createUser({
                username: un,
                email: email,
                password: pwd
            }, function (err) {
                if (err) alert(err.message);
            });
        }
    }
});