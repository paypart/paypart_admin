$(function () {
    function setHeader(xhr) {
        var h_value;
        if (sessionStorage.getItem('h_value') != null) {
            h_value = sessionStorage.getItem('h_value');
            xhr.setRequestHeader('HVal', h_value);
            sessionStorage.removeItem('h_value');
        }     
    }
    $('#btnForgotPwd').click(function () {
        $("#txtPassword").val("");
        $("#lblLogin").html("");
        resetPassword()
    });
    $('#btnSignIn').click(function () {
        $("#txtPassword").val("");
        $("#lblLogin").html("");
        showSignIn()
    });
    $('#btnResetPwd').click(function () {
        resetPassword()
        var id = $("#logInEmail").val();
        if ($("#logInEmail").val() == "") {
            $("#lblResetPwd").html("Please enter email");
            return;
        }
        var resetUser = {
            Email: id
        }

        resetUser = JSON.stringify(resetUser);
        console.log(resetUser);
        //getToken(user);

        $.ajax({
            type: "POST",
            url: baseAddress() + "api/users/resetuser",
            //beforeSend: setHeader,
            data: resetUser,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                if (data != null) {
                    console.log(data);

                    if (data.email == id) {
                        $("#logInEmail").val("");
                        console.log(data);
                        $("#successlbl").html(":  Reset successful, log in to " + id + " to retrieve password.");
                        $('#sucModal').modal('show');
                    }
                    else {
                        $('#failModal').modal('show');
                        $("#failurelbl").html(": Reset Failed, Try again or contact site Admin.");
                    }
                }
            },
            failure: function (errMsg) {
                $('#failModal').modal('show');
                $("#failurelbl").html(": Reset Failed, Try again.");
                console.log(errMsg);
            }
        });
    });
    function resetPassword() {
        $("#changediv").hide();
        $("#passdiv").hide();
        $("#logindiv").hide();
        $("#resetdiv").show();
        $("#logindiv").css("display", "none");
        $('#signInHeader').html("Reset Password");
    }
    function showSignIn() {
        $("#changediv").hide();
        $("#passdiv").show();
        $("#logindiv").show();
        $("#resetdiv").hide();
        $("#logindiv").css("display", "block");
        $('#signInHeader').html("Please Sign In");
    }
    function baseAddress() {
        var badd = "http://localhost:51725/";
        //var badd = "http://fees.midesoftng.com/api/Tasker/";
        return badd;
    };
    var token = $('input[name=__RequestVerificationToken]').val();
    sessionStorage.setItem("id_token", token);

    function getToken(value) {
        var hashValue;
        var h_key;
        if (sessionStorage.getItem('h_key') != null) {
            h_key = sessionStorage.getItem('h_key');
        }
        hashValue = CryptoJS.HmacSHA256(value, h_key);
        hashValue = CryptoJS.enc.Base64.stringify(hashValue);
        sessionStorage.setItem("h_value", hashValue);
    }
});