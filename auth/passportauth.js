module.exports = function(mongoose, passport, FacebookStrategy)
{
	var userSchema = new mongoose.Schema({
		profileId: String,
		fullName: String,
		displayPicture: String
	});
	
	var user = mongoose.model('userSchema', userSchema);
	
	passport.serializeUser(function(user,done){
		done(null, user.id);
	});
	
	passport.deserializeUser(function(id, done){
		user.findById(id, function(err, result){
			done(null, result);
		});
	});
	
	passport.use(new FacebookStrategy({
	    clientID: '222552914456214',
	    clientSecret: 'db91b2dfb4fe41b4c4418389c4c0c6d7',
	    callbackURL: "https://node-samarthagarwal.c9.io/auth/facebook/callback/",
	    profileFields: ['id','displayName','photos']
	  },
	  function(accessToken, refreshToken, profile, done) {
	    //Check if there is a user already
	    user.findOne({profileId: profile.id}, function(err, result) {
	      if (err) { 
	      	return done(err); 
	      }
	      if (result) {
	      	done(null, result); 
	      }
	      else{  //Otherwise create a new user
	      	var newUser = new user(
	      		{
	      			profileId: profile.id,
	      			fullName: profile.displayName,
	      			displayPicture: profile.photos[0].value || ''
	      		});
	      		newUser.save(function(err){
	      			done(null, newUser);	
	      		});
	      }
	    });
	  }
	));
}