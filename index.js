var http = require('http');
var express = require('express');
var app = express();
//---------- routing starts ---------------//
//module.exports = function(app) {
 
var bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
// get some data
app.get('/api/someData', function(req, res) {
  //do stuff to get data
  var data={somedata:[1,2,3,4]}
  res.json(data);
});
 
// save a data
app.post('/api/subscribe', function(req, res) {
  //do stuffs to save
  var data = req.body;
  console.log(data.email)
  //try{
  	var mailId=data.email;
  	var saveIt=DBOperator.saveMail(data.email);
  	switch(saveIt){
  		case 1:
  			console.log("Subscribed successfully");
  		case -1:
  			console.log("already subscribed");
  		default:
  			console.log("unknown error occured");
  	}
 //  }
 //  catch(e){
	// console.log("ERROR");
 //  }
  //res.json({isSaved:true});
});

 
//};

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
