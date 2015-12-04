
 function buildTable(data) {
    var table = document.createElement("table");
	var btn = document.createElement("BUTTON");
	table.id = "myTable";
  
    var fields = Object.keys(data[0]);
    var headRow = document.createElement("tr");
    fields.forEach(function(field) {
      var headCell = document.createElement("th");
      headCell.textContent = field;
      headRow.appendChild(headCell);
	  headCell.style.border="thin solid black";
	  headCell.style.textContent="5px";
    });
    table.appendChild(headRow);
	table.style.borderSpacing = '0px';
    data.forEach(function(object) {
      var row = document.createElement("tr");
      fields.forEach(function(field) {
        var cell = document.createElement("td");
        cell.textContent = object[field];
        if (typeof object[field] == "number")
          cell.style.textAlign = "right";
        row.appendChild(cell);
		cell.style.border= "thin solid black";
	  
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
  
   function reloaded(event){
		var table = document.getElementById("myTable");
		while(table.rows.length) {
			table.deleteRow(0);
		}
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


 function cleartable(pick_table){
	var table = pick_table;
    while(table.rows.length) {
	table.deleteRow(0);
	}
 }
 
function bindButtons()
 {
 document.getElementById('add').addEventListener('click', function(event)
	{
		var table = document.getElementById("myTable");
		var req = new XMLHttpRequest();
		var wname = document.getElementById('wname').value ;
		var reps = document.getElementById("reps").value;
		var weight = document.getElementById("weight").value;
		var date = document.getElementById("date").value;
		var pounds = document.getElementById("pounds").value;
		
		if (wname!=""){
		req.open("GET", 'http://52.25.198.76:3000/insert?wname='+ wname +'&reps='+reps+'&weight='+weight+'&date='+date+'&pounds='+pounds, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status <400){
			addrow(wname,reps,weight,date,pounds);
//			cleartable();
//			reloaded();
//			table.parentNode.removeChild(table);
			reloaded(table);
			}
		});
		req.send(null);
		event.preventDefault(); 
		} else {
			alert("Not added. Name input missing");
		}		
	})
	document.getElementById('delete').addEventListener('click', function(event)
	{
		
		var req = new XMLHttpRequest();
		var deleteID = document.getElementById('delete_id').value ;
		
		
		req.open("GET", 'http://52.25.198.76:3000/delete?delete_id=' +deleteID, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status <400){
				reloaded();
			}
		});
		req.send(null);
		event.preventDefault();  	
	})
	document.getElementById('uname').addEventListener('click', function(event)
	{
		
		var req = new XMLHttpRequest();
		var new_name = document.getElementById('ename').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updatename?ename=' + new_name + '&eid='+selected_id, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status <400){
			}
		});
		req.send(null);
		event.preventDefault();
		}		
	})
	document.getElementById('ureps').addEventListener('click', function(event)
	{
		
		var req = new XMLHttpRequest();
		var new_rep = document.getElementById('ereps').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updatereps?ereps=' + new_rep + '&eid='+selected_id, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status <400){
			}
		});
		req.send(null);
		event.preventDefault(); 
		}		
	})
	document.getElementById('uweight').addEventListener('click', function(event)
	{
		
		var req = new XMLHttpRequest();
		var new_weight = document.getElementById('eweight').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updateweight?eweight=' + new_weight + '&eid='+selected_id, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status <400){
			}
		});
		req.send(null);
		event.preventDefault();  
		}		
	})
	document.getElementById('udate').addEventListener('click', function(event)
	{
		
		var req = new XMLHttpRequest();
		var new_date = document.getElementById('edate').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updatedate?edate=' + new_date + '&eid='+selected_id, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status <400){
			}
		});
		req.send(null);
		event.preventDefault();  
		}
	})
	document.getElementById('upounds').addEventListener('click', function(event)
	{
		var req = new XMLHttpRequest();
		var new_pounds = document.getElementById('epounds').value ;
		var selected_id=document.getElementById('eid').value;
		if (selected_id!=""){
		req.open("GET", 'http://52.25.198.76:3000/updatepounds?epounds=' + new_pounds + '&eid='+selected_id, true);
		req.addEventListener('load', function(){
			if (req.status >= 200 && req.status <400){
			}
		});
		req.send(null);
		event.preventDefault();  	
		}
	})
	
 }

 
 
 function addrow(wname, reps, weight, date, pounds){
	var table = document.getElementById("myTable");
	var row = document.createElement("tr");	 
   
	
	 //Name
	 var cell = document.createElement("td");
        cell.textContent = wname;
        if (typeof wname == "text")
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
     
	      //date
	cell.textContent = date;
        if (typeof date == "date")
          cell.style.textAlign = "right";
        row.appendChild(cell);	
     
	      //weight
	cell.textContent = pounds;
        if (typeof pounds == "number")
        cell.style.textAlign = "right";
        row.appendChild(cell);	
      table.appendChild(row);
	  
	  
}
 function deleterow(wname, reps, weight, date, pounds){
	 var table = document.getElementById("myTable");
	 
	 var row = document.createElement("tr");
	 //Name
	 var cell = document.createElement("td");
        cell.textContent = wname;
        if (typeof wname == "text")
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
      table.appendChild(row);
	      //date
	cell.textContent = date;
        if (typeof date == "date")
          cell.style.textAlign = "right";
        row.appendChild(cell);	
      table.appendChild(row);
	      //weight
	cell.textContent = pounds;
        if (typeof pounds == "number")
        cell.style.textAlign = "right";
        row.appendChild(cell);	
      table.appendChild(row);

}
 
