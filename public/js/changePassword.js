let url = "http://localhost:4000/auth"; //please change 

$("#lEmail").hide();
$("#lCaptcha").hide();
$('#lConfPassword').hide();
$('#lOTP').hide();
$('#lPassword').hide();

function changePassword() {
    let email = $('#email').val().trim();
    let captchaToken = grecaptcha.getResponse();
    let password = $('#password').val();
    let confPassword = $('#confPassword').val();
    let emailOTP= $('#OTP').val();

    $("#lEmail").hide();
    $("#lCaptcha").hide();
    $('#lConfPassword').hide();
    $('#lOTP').hide();
    $('#lPassword').hide();

    $("#email").css({ "border": "" });
    $("#password").css({ "border": "" });
    $("#confPassword").css({ "border": "" });
    $("#OTP").css({ "border": "" });

    if (email === "") {
        $("#lEmail").show();
        return;
    }

    if (captchaToken === "") {
        $("#lCaptcha").show();
        return;
    }

    if(password === "")
    {
        $('#lpassword').show();
        return;
    }

    if(confPassword === "")
    {
        $('#lConfPassword').show();
        return;
    }

    if(emailOTP === "")
    {
        $('#lOTP').show();
        return;
    }

    $("#btnChangePassword").attr("disabled", true);

    $.ajax({
        url: url + "/changePassword",
        method: "POST",
        data: {
            email: email,
            password: password,
            confPassword: confPassword,
            emailOTP: emailOTP,
            captchaToken: captchaToken
        },
        crossDomain: true,
        success: function (res) {
            console.log(res);
            if (res.status !== 200) {
                $("#btnChangePassword").attr("disabled", false);
                $("#errMsg").text(res.message);
            }
            else if (res.status === 200) {
                if (res.isVerfied === false) {
                    localStorage.setItem("token", res.token);
                    window.location = "login2.html";
                }
                else {
                    localStorage.setItem("token", res.token);
                    window.location = "login2.html";
                }
            }
        },
        error: function (err) {
            $("#btnChangePassword").attr("disabled", false);
            $("#errMsg").text(err);
        }
    });
}