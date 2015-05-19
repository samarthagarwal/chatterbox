module.exports = function(app, express, path, passport){
    
    var router = express.Router();
    
    router.get('/', function(req, res){
  	    res.render('login');
    });

    router.get('/auth/facebook', passport.authenticate('facebook'));
    router.get('/auth/facebook/callback', passport.authenticate('facebook', 
        {
            successRedirect: '/chat',
            failureRedirect: '/'
        }        
    ));
    
    router.get('/chat', function(req, res){
        //console.log(res);
  	    res.render('chat', {user : req.user});
    });
    
    return router;
}