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
        loadEmployees();
    }
    else {
        window.location = "index.html";
    }

}

function loadEmployees() {
    axios.get(url + "/employees", headers).
        then(function (res) {
            console.log(res);
            displayEmployee(res.data.message);
        }).catch(function (err) {
            console.log(err);
        });
}

function displayEmployee(employees) {

    var container = document.getElementById("inner-container");
    for (var i = 0; i < employees.length; i++) {
        container.innerHTML += `
        <div class="four columns">
        <div class="card">
            <div class="id-container">
                <span class="empid">${employees[i].emp_id}</span>
            </div>
            <div class="card-info">
                <span class="empname">${employees[i].emp_name} ${employees[i].emp_lastname}</span>
                <span class="email"><i>${employees[i].emp_email}</i></span>
                <span class="address">${employees[i].emp_address}</span>
            </div>

            <button id="action-employee-btn" onclick="window.location = 'singleEmployee.html?id=${employees[i].emp_id}';">Actualizar</button>
        </div>
    </div>
        `;
    }

}

function searchEmployee(name) {
    if (name != '') {

        axios.get(url + "/employees/" + name, headers).
            then(function (res) {
                console.log(res);
                resultEmployee(res.data.message);
            }).catch(function (err) {
                console.log(err);
            });
    }
}

function resultEmployee(employees) {

    var container = document.getElementById("inner-container");
    for (var i = 0; i < employees.length; i++) {
        container.innerHTML = `
        <div class="four columns">
        <div class="card">
            <div class="id-container">
                <span class="empid">${employees[i].emp_id}</span>
            </div>
            <div class="card-info">
                <span class="empname">${employees[i].emp_name} ${employees[i].emp_lastname}</span>
                <span class="email"><i>${employees[i].emp_email}</i></span>
                <span class="address">${employees[i].emp_address}</span>
            </div>

            <button id="action-employee-btn" onclick="window.location = 'singleEmployee.html?id=${employees[i].emp_id}';">Actualizar</button>
        </div>
    </div>
        `;
    }

}


