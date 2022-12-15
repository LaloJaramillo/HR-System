window.onload = init;

function init() {
    if (!localStorage.getItem("token")) {
        document.querySelector('.second-button').addEventListener('click', function () {
            window.location.href = 'signin.html';
        });

        document.querySelector('.primary-button').addEventListener('click', login);
    }
    else{
        window.location.href = "dunder-mifflin.html"
    }
}
function login() {
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-pswd').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/admin/login',
        data: {
            admin_mail: mail,
            admin_password: password
        }
    }).then(function (res) {
        if (res.data.code === 200) {
            localStorage.setItem("token", res.data.message);
            window.location.href = "dunder-mifflin.html";
        }
        else {
            alert("Usuario y/o contraseña incorrectos");
        }
    }).catch(function (err) {
        console.log(err);
    })
}