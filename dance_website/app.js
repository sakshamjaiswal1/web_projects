const express = require("express");
var  mongoose  = require("mongoose");
mongoose.connect('mongodb://localhost/dance',{useNewUrlParser:true});
const path =require('path');
const bodyparser =require("body-parser");
// mongoose.connect('mongodb')
const app =express();
const port=80;


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views'))

// define mongoose schema
var contactSchema = new mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    address:String,
    style:String
});

var Contact =mongoose.model('contact',contactSchema);

// ENDPOINTS
app.get('/', (req, res)=>{
  
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{
  
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res)=>{
  
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("this item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("item was not saved to the database")
    })    
    // res.status(200).render('contact.pug');
})





app.listen(port,()=>{
    console.log(`the application started successfully on port ${port}`)
});
