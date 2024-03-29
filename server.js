//Loading NPM Modules

var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app = express();

// require('./router/main')(app);
//var router = require('./router/main');

// app.use(express.static(__dirname + '/bootstrap-3.2.0-dist'));
// app.use(express.static(__dirname + '/css'));
// app.use(bodyParser);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/'));
// 

var router =express.Router();

	router.get('/', function(req,res){
		res.render('index')
	});

	router.post('/stocknow', function(request,response){
		var stockName = request.body.data.stockname;
		console.log(stockName);

		if(stockName && stockName.length>0){
		console.log("Am inside the loop");
	    var options = {
	    	host:'www.nseindia.com',
	    	method: 'GET',
	    	path: '/live_market/dynaContent/live_watch/get_quote/ajaxGetQuoteJSON.jsp?symbol='+stockName,
	    	headers:{
	    		"User-Agent": "Mozilla/4.0 (compatible; MSIE 5.01; Windows NT 5.0)",
			  	"Referer": "http://www.nseindia.com/",
			  	"Accept": '*/*'
	    	}
	    };

	    var stockData = "";

	    var req = http.request(options, function(res){
	    		res.on('error', function(e){
	    			console.log('Got Error:'+ e.message);
	    			response.end(invalidRequest(),400);
	    		});

	    		res.on('data', function(data){
	    			stockData+=data;
	    			console.log("On DATA" + stockData);
	    		});

	    		res.on('end', function() {
					stockData = stockData.trim();
					data = JSON.parse(stockData);
					console.log("On END" + stockData);
	    		
		    		if(data.data.length < 1){
		    			console.log("Error:");
		    			response.send('Error');
		    			return;
		    		}

	    		// Cleaning up the feeds
				delete data.otherSeries;
				delete data.optLink;
				delete data.futLink;
				
				// Now send the data
				response.send(data);

				});


		});

		req.end();
	}else{
		response.end(invalidrequest(),400)
	}
});


app.use('/',router);
app.use('/stocknow',router);

function invalidRequest() {
	return "<h1>INVALID REQUEST</h1>";
}

// app.set('views',__dirname+'/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);


// app.use(app.router);

// var router = express.Router();
// app.use(express.static(path.join(__dirname, '/')));

// app.use(function(req,res){
// 	res.fs.sendfile(__dirname+'/index.html');
// });

http.createServer(app).listen(app.get('port'), function () {
    console.log("Express server listening on port " + app.get('port'));
});