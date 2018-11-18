const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
const port = 3000
var db

// The line below sets everything in the public folder to load when the page loads
app.use(express.static('public'))
// This set sthe bodyParser to be true
app.use(bodyParser.urlencoded({extended: true}))
// Sets the view engine on the page to render ejs templates
app.set('view engine', 'ejs')


// Connect tp the mlab database, if successful our app will listen on port 3000
MongoClient.connect('mongodb://rossio:rcbootcamp18@ds129090.mlab.com:29090/appexpress', (err, database) => {
  if (err) return console.log(err)
  // returns the database and store in the global variable db
    db = database
    // sets the port to listen to when the database sucessfully connects
    app.listen(port, function(){
      console.log('Listening on port ' + port)
    })
})

// the first event listener for ther servewr. 
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
   if (err) return console.log(err)
   // renders index.ejs
   res.render('index.ejs', {quotes: result})
 })
})


app.post('/quotes', (req, res) => {
 db.collection('quotes').save({name: req.body.name, quote: req.body.quote}, (err, result) => {
   if (err) return console.log(err)

   console.log('Saved to the database')
   res.redirect('/')
 })
})
