let url = "http://localhost:4000/auth";

$("#sEmail").hide();
$("#sPassword").hide();
$("#sCnfPassword").hide();
$("#sPasswordMatch").hide();
$("#sCaptcha").hide();

function signupForm() {
    let email = $('#email').val().trim();
    let password = $('#password').val();
    let confirmPassword = $('#confirmPassword').val();
    let captchaToken = grecaptcha.getResponse();

    $("#sEmail").hide();
    $("#sPassword").hide();
    $("#sCnfPassword").hide();
    $("#sPasswordMatch").hide();
    $("#sCaptcha").hide();

    if (email === "") {
        $("#sEmail").show();
        return;
    }

    if (password === "") {
        $("#sPassword").show();
        return;
    }

    if (confirmPassword === "") {
        $("#sCnfPassword").show();
        return;
    }

    if (confirmPassword !== password) {
        $("#sPasswordMatch").show();
        return;
    }

    if (captchaToken === "") {
        $("#sCaptcha").show();
        return;
    }

    $("#btnSignUp").attr("disabled", true);

    $.ajax({
        url: url + "/register",
        method: "POST",
        data: {
            email: email,
            password: password,
            confPassword: confirmPassword,
            captchaToken: captchaToken
        },
        crossDomain: true,
        success: function (res) {
            console.log(res);
            if(res.status!==200){
                $("#btnSignUp").attr("disabled", false);
                $("#errMsg").text(res.message);
            }
            else if(res.status === 200){
                if(res.isVerified === false){
                    localStorage.setItem("token", res.token);
                    window.location = "verify.html";
                }
            }
        },
        error: function (err) {
            $("#btnSignUp").attr("disabled", false);
            $("#errMsg").text(err);
        }
    });
}