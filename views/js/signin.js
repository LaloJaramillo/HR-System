window.onload = init;

function init(){
    
    if (!localStorage.getItem("token")) {
        document.querySelector('.second-button').addEventListener('click', function(){
            window.location.href = 'login.html';
        });
    }
    else{
        window.location.href = "index.html"
    }

    

    document.querySelector('.primary-button').addEventListener('click', signin);
}

function signin(){
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-mail').value;
    var password = document.getElementById('input-pswd').value;

    axios({
        method: 'post',
        url: 'http://localhost:3000/admin/signin',
        data: {
            admin_name : name,
            admin_mail : mail,
            admin_password: password
        }
    }).then(function(res){
        console.log(res);
        alert("Registro existoso");
        window.location.href = "login.html"
    }).catch(function(err){
        console.log(err);
    })
}