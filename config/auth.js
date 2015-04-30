module.exports = {
	'facebookAuth' : {
		'clientID': process.env.FACEBOOK_ID,
		'clientSecret': process.env.FACEBOOK_SECRET,
		'callbackURL': 'http://localhost:8080/auth/facebook/callback'
	},

	'googleAuth' : {
		'clientID': process.env.GOOGLE_ID,
		'clientSecret': process.env.GOOGLE_SECRET,
		'callbackURL': 'http://localhost:8080/auth/google/callback'
	}
}