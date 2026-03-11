function showTab(tabID){

document.getElementById("patientTab").classList.add("hidden");
document.getElementById("doctorTab").classList.add("hidden");

document.getElementById(tabID).classList.remove("hidden");

}

function startMonitoring(){

let id = document.getElementById("patientID").value;

if(id===""){
alert("Please enter Patient ID");
return;
}

alert("Monitoring started for Patient " + id);

/* later ESP32 will send data */

simulateData();

}

function loadPatient(){

let id = document.getElementById("doctorPatientID").value;

if(id===""){
alert("Enter Patient ID");
return;
}

document.getElementById("displayID").innerText=id;

}

function simulateData(){

setInterval(function(){

let sys = 110 + Math.floor(Math.random()*20);
let dia = 70 + Math.floor(Math.random()*15);

document.getElementById("sys").innerText=sys;
document.getElementById("dia").innerText=dia;

},3000);

}