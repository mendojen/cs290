
 var wname=getElementById(name);
 var MOUNTAINS = [
  {name: wname, reps: getElementById("reps"), weight: getElementById("date"),lbs:getElementById("pounds")},
];

 function buildTable(data) {
    var table = document.createElement("table");
  
    var fields = Object.keys(data[0]);
    var headRow = document.createElement("tr");
    fields.forEach(function(field) {
      var headCell = document.createElement("th");
      headCell.textContent = field;
      headRow.appendChild(headCell);
    });
    table.appendChild(headRow);

    data.forEach(function(object) {
      var row = document.createElement("tr");
      fields.forEach(function(field) {
        var cell = document.createElement("td");
        cell.textContent = object[field];
        if (typeof object[field] == "number")
          cell.style.textAlign = "right";
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    return table;
  }
document.body(buildTable(MOUNTAINS));


if (typeof module != "undefined" && module.exports)
  module.exports = MOUNTAINS;

 function loaded(event){
	var req= new XMLHttpRequest();
	req.open("GET",'http://52.25.198.76:3000/', true);
	req.setRequestHeader("Content-type", "application/json");
	req.addEventListener("load", function(){
		if(req.status >=200 && req.status < 400){
			var response =req.responseText;
			console.log(response);
			
		}
	})
	document.body.appendChild(buildTable(MOUNTAINS));
	
 };
  
document.addEventListener('DOMContentLoaded', bindButtons);
//Depending on which button is pushed, that specific event function is called
function bindButtons()
 {
 document.getElementById('add').addEventListener('click', function(event)
	{
		var req = new XMLHttpRequest();
		var wname = document.getElementById('wname').value + ',US';
		var reps = document.getElementById("reps");
		var weight = document.getElementById("weight");
		var date = document.getElementById("date");
		var pounds = document.getElementById("pounds");
		
		req.open("GET", 'http://52.25.198.76:3000/insert?wname='+ wname +'&reps='+reps+'&weight='+weight+'&date='+date+'&pounds='+pounds, true);
		req.addEventListener('load', function(){
		if (req.status >= 200 && req.status <400){
		var response = JSON.parse(req.responseText);
		var name = document.getElementById("name");

		var table = document.getElementById("workout_table");

		} else{
		console.log("error in network request:" +req.statusText);
		}})
		req.send(null);
		event.preventDefault();  	
	})
 }
