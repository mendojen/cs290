var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3333);

app.get('/get',function(req,res){
  var getData = [];
  for (var p in req.query){
    getData.push({'name':p,'value':req.query[p]})
  }
  var context = {reqType: "GET"};
  context.dataList = getData;
  res.render('received', context);
});

app.post('/getrequest', function(req,res){
  var postData = [];
  for (var p in req.body){
    postData.push({'name':p,'value':req.body[p]})
  }
	for (var p in req.query){
		postData.push({'name':p, 'value':req.query[p]})
	}
  console.log(postData);
  console.log(req.body);
  var context = {reqType: "POST"};
  context.dataList = postData;
  res.render('received', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
