var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var cors = require('cors');

 

//app.configure(function() {
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
    //app.use(cors);
    
//});


// save mail
app.post('/api/subscribe', function(req, res) {
	 res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  //do stuffs to save
    var data = req.body;
  	var responseObj ={
  		isSuccess:false,
  		errMsg:''
  	}

  	console.log("email is: "+data.email);
  	if(!data.email || !validateEmail(data.email)){
  		console.log("validation error")
  		responseObj.isSuccess=false;
  		responseObj.errMsg="Email id not valid";
  		res.json(responseObj);
  	}
  	else{
  	DBOperator.saveMail(data.email);
  		responseObj.isSuccess=true;
  		responseObj.errMsg="";
  		res.json(responseObj)
  	}
});

function validateEmail(email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

//----------- routing ends -----------------//

var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;
var dbUrl = "mongodb://localhost/test";
var collectionName = "subscribedmails"

var DBOperator={
	saveMail:function (email) {
		var response = 0;
		mongoClient.connect(dbUrl,function (err, db) {
		if(err){
			console.log("error in db connectivity");
		}
		else
			{
			console.log("db connected successfully");
			console.log("email is "+email)
			var collection = db.collection(collectionName);
			var a = collection.find({email:email});
			console.log("a is "+a);
			if(0)
				response=-1;
			else{
				collection.insert({email:email},function (err,results) {
					if(!err){
						response=1;
					}

					console.log(response);
					db.close();
				});
			}
			}
		});
		return response;
	}	
}


app.listen(8000);
console.log("Server is listening to port 8000");
