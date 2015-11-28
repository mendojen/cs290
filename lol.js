var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var credentials = require('./credentials.js');
var request = require('request');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);
app.use(express.static('public'));

app.get('/', function (req,res){
   var context = {};
  res.render('homepage', context)
});

app.get('/recentgames', function(req, res, next){
  var context = {};
  request('https://na.api.pvp.net/api/lol/' + req.query.region + '/v1.3/game/by-summoner/'+req.query.userid+'/recent?api_key=' + credentials.riotKey, function(err, response, body){
    if(!err && response.statusCode < 400){
      context.riot = JSON.parse(body);
       var userinfo=(context.riot.games[0].gameMode);
      res.render('recent',context);
      
    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});
app.get('/champion', function(req, res, next){
  var context = {};
  request('https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion/' + req.query.champ_id + '?api_key=' + credentials.riotKey, function(err, response, body){
    if(!err && response.statusCode < 400){
      context.riot = body;
      res.render('champ',context);
    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

app.get('/summonerid', function(req, res, next){
  var context = {};
  request('https://na.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + req.query.user +'?api_key=' + credentials.riotKey, function(err, response, body){
    if(!err && response.statusCode < 400){
      context.riot = body;
      res.render('userid',context);
    } else {
      if(response){
        console.log(response.statusCode);
      }
      next(err);
    }
  });
});

  


app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
