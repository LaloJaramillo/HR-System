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
        loadEmployee();
    }
    else {
        window.location = "index.html";
    }

}

function loadEmployee() {
    var url_string = window.location.href;
    var url_object = new URL(url_string);
    var emp_id = url_object.searchParams.get("id");

    axios.get(url + `/employees/${emp_id}`, headers).
        then(function (res) {
            console.log(res);
            displaySingleEmployee(res.data.message);
        }).catch(function (err) {
            console.log(err);
        });


}



function displaySingleEmployee(employee) {
    var container = document.getElementById("data-info-fill");

    var btn_container = document.getElementById("actions-container");

    container.innerHTML = `
    <h4 id="emp_id">Empleado No. ${employee[0].emp_id}</h4>
    <label for="emp_name">Nombre</label>
    <input  id="emp_name" type="text" Value="${employee[0].emp_name}" disabled>
    
    <label for="emp_lastname">Apellido</label>
    <input  id="emp_lastname" type="text" Value="${employee[0].emp_lastname}" disabled>
    
    <label for="emp_phone">Teléfono</label>
    <input  id="emp_phone" type="text" Value="${employee[0].emp_phone}" disabled>
    
    <label for="emp_email">Email</label>
    <input  id="emp_email" type="text" Value="${employee[0].emp_email}" disabled>
    
    <label for="emp_address">Dirección</label>
    <input  id="emp_address" type="text" Value="${employee[0].emp_address}" disabled>
    `;

    btn_container.innerHTML = `
    <button id="button-act" onclick="changeInfoEmployee(${employee[0].emp_id})">Modificar</button>
    <button id="button-del" onclick="deleteEmployee(${employee[0].emp_id})">Eliminar</button>
    `;
}

function changeInfoEmployee(id_employee) {
    var inputs = document.getElementsByTagName("input");

    for (var i = 0; i < inputs.length; i++) {
        inputs[i].disabled = false;
    }

    document.getElementById("button-act").style.backgroundColor = "green";
    document.getElementById("button-act").textContent = "Actualizar";
    document.getElementById("button-act").setAttribute('onclick',`updateEmployee(${id_employee})`);
}


function updateEmployee(id_employee) {
    var name = document.getElementById("emp_name").value;
    var lastname = document.getElementById("emp_lastname").value;
    var phone = document.getElementById("emp_phone").value;
    var email = document.getElementById("emp_email").value;
    var address = document.getElementById("emp_address").value;

    axios.put(url + "/employees/" + id_employee,
        {
                emp_id: id_employee,
                emp_name: name,
                emp_lastname: lastname,
                emp_phone: phone,
                emp_email: email,
                emp_address: address
        }, headers).
        then(function (res) {
            console.log(res);
            alert("Se actualizó al empleado correctamente");
            window.location = "index.html";
        }).catch(function (err) {
            console.log(err);
        });
}

function deleteEmployee(id_employee) {

    if (localStorage.getItem("token")) {
        token = localStorage.getItem("token");
        headers = {
            headers: {
                'Authorization': "bearer " + localStorage.getItem("token")
            }
        }
        axios.delete(url + "/employees/" + id_employee, headers).
            then(function (res) {
                console.log(res);
                alert("Se eliminó al empleado correctamente");
                window.location = "index.html";
            }).catch(function (err) {
                console.log(err);
            });
    }
}





