var express = require('express');
var app = express();  //express
var MongoClient = require('mongodb');  //mongodb
var bodyParser = require('body-parser');  //body-parser middleware


MongoClient.connect('mongodb://username:password@jello.modulusmongo.net:27017/jAhy3bov', (err, database) => {
	if(err) return console.log(err)
		db=database

	app.listen(3000, function(){
		console.log('listening on port 3000')
	})

})

//set Express to use EJS view engine
app.set('view engine', 'ejs')


//add body-parser express middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
//define our public directory to serve our static resources
app.use(express.static(__dirname + '/public'))


//define routes
app.get('/', (req, res) => {
	db.collection('purchaseDB').find().toArray(function(err, result){
		if (err) return console.log(err)
		//else render ejs
		res.render('index.ejs', {purchaseDB :result})
	})
})

//handle post request
app.post('/add', (req,res) => {
	db.collection('purchaseDB').save(req.body, (err, result) => {
		if (err) return console.log(err)
			console.log(req.body)
			console.log('New entry saved to DB')
			res.redirect('/')
	})
})

//handle delete
app.get( '/destroy/:id', (req, res) => {


	db.collection('purchaseDB', function(err, collection) {
		if(err) return console.log(err)
			//else
   collection.remove({_id: new MongoClient.ObjectID(req.params.id)});
   res.redirect('/')
});


})