const express         =     require('express')
  , passport          =     require('passport')
  , cookieParser      =     require('cookie-parser')
  , session           =     require('express-session')
  , bodyParser        =     require('body-parser')
  , config            =     require('./configuration/config')
  ,facebookConfig     =     require('./configuration/facebookConfig')
  , app               =     express();

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;



// Passport session setup.
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
    clientID: config.api_key,
    clientSecret: config.api_secret,
    callbackURL: config.callback_url
  },
  function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
  }
));

passport.use(new FacebookStrategy({
    clientID: facebookConfig.api_key,
    clientSecret: facebookConfig.api_secret,
    callbackURL: facebookConfig.callback_url
  },
  function(accessToken, refreshToken, profile, done){
    return done(null, profile);
  }
));



app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('index', { user: req.user });
});


//google
app.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google',  { successRedirect : '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);


//facebook
app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook',  { successRedirect : '/', failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  }
);

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

app.listen(3000, () => console.log('Server up'));