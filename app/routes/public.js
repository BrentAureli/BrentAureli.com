var client = require('twilio')(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

module.exports = function(router){
	//localhost:8080/auth/
	router.get('/', function(req, res){
		res.render('index.ejs');
	});

	router.get('/testtwilio', function(req, res){
		client.sendMessage({
			to: '+18175264051',
			from: '+18176591086',
			body: 'Hello World from twilio'
		}, function(err, data){
			if(err)
				console.log(err);
			console.log(data);
			res.send("Message Sent");
		});
	});	
	
};
