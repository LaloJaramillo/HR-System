window.onload = init;
var headers = {};
var url = "http://localhost:3000";


function init() {
    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
    }
    else {
        window.location = "index.html";
    }

}

function createEmployee() {
    var name = document.getElementById("emp_name").value;
    var lastname = document.getElementById("emp_lastname").value;
    var phone = document.getElementById("emp_phone").value;
    var email = document.getElementById("emp_email").value;
    var address = document.getElementById("emp_address").value;

    axios.post(url + "/employees",
        {
            emp_name: name,
            emp_lastname: lastname,
            emp_phone: phone,
            emp_email: email,
            emp_address: address
        }, headers).
        then(function (res) {
            console.log(res);
            alert("Empleado agregado correctamente");
            window.location = "index.html";
        }).catch(function (err) {
            console.log(err);
        });
}