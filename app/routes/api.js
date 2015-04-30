var fs = require('fs');

module.exports = function(router, passport){

	router.use(function(req, res, next){
		fs.appendFile('logs.txt', req.path + " token: " + req.query.access_token + "\n",
			function(err){
				next();
			});
	});

	router.get('/testAPI', function(req, res, next){
		if(req.query.access_token) next();
		else next('route');
	},passport.authenticate('bearer', { session: false }),
		function(req, res){
		res.json({ SecretData: 'abc123', Authenticated: true });
	});

	router.get('/testAPI', function(req, res){
		res.json({ SecretData: 'abc123', Authenticated: false });
	});

}