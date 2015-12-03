
 function buildTable(data) {
    var table = document.createElement("table");
	table.id = "myTable";
  
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



 function loaded(event){
		var req = new XMLHttpRequest();
		
		req.open("GET", 'http://52.25.198.76:3000/select', true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status < 400){
				
				var response = JSON.parse(req.responseText);			
				document.body.appendChild(buildTable(response));
				}
			});
		req.send();
 }
  
document.addEventListener('DOMContentLoaded', bindButtons);
//Depending on which button is pushed, that specific event function is called
function bindButtons()
 {
 document.getElementById('add').addEventListener('click', function(event)
	{
		var req = new XMLHttpRequest();
		var wname = document.getElementById('wname').value ;
		var reps = document.getElementById("reps").value;
		var weight = document.getElementById("weight").value;
		var date = document.getElementById("date").value;
		var pounds = document.getElementById("pounds").value;
		
		req.open("GET", 'http://52.25.198.76:3000/insert?wname='+ wname +'&reps='+reps+'&weight='+weight+'&date='+date+'&pounds='+pounds, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status <400){
			addrow(wname,reps,weight,date,pounds);
			}
		});
		/*
		req.addEventListener('load', function(){
		if (req.status >= 200 && req.status <400){
		var response = JSON.parse(req.responseText);
		alert(response[0].name);
		for (var i = 0; i < response.length; ++i) {
		 wname = response[i].name;
		 reps = response[i].reps;
		 weight=response[i].weight;
		 date = response[i].date;
		 pounds = response[i].pounds;
		}


		} else{
		console.log("error in network request:" +req.statusText);
		}})
		*/
		req.send(null);
		event.preventDefault();  	
	})
 }

 
 function addrow(wname, reps, weight, date, pounds){
	 var table = document.getElementById("myTable");
	 
	 var row = document.createElement("tr");
	 //Name
	 var cell = document.createElement("td");
        cell.textContent = wname;
        if (typeof wname == "number")
          cell.style.textAlign = "right";
        row.appendChild(cell);
    
	//reps
	cell.textContent = reps;
        if (typeof reps == "number")
          cell.style.textAlign = "right";
        row.appendChild(cell);
		
    //weight
	cell.textContent = weight;
        if (typeof weight == "number")
          cell.style.textAlign = "right";
        row.appendChild(cell);
		    //weight
	cell.textContent = weight;
        if (typeof weight == "number")
          cell.style.textAlign = "right";
        row.appendChild(cell);
		
      table.appendChild(row);
 }
