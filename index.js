// Defines express.js
var express = require('express'); 
var app = express();

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false}));


// Sample get/post functions in node.js for get/post forms

// I believe this one is to get the required index file you have in your project
app.get('/', function(req,res)
{
    res.sendFile(__dirname + '\\' + 'index.html');
});

// app.post('/submit-student-data', function(req,res)
// {
//     var name = req.body.firstName + ' ' + req.body.lastName;

//     res.send(name + ' Submitted Successfully');
// });


app.get('/index', function(req,res)
{
    res.sendFile(__dirname + '/public' + '/index.html');
});

app.get('/cafe', function(req,res)
{
    res.sendFile(__dirname + '/public' + '/cafe.html');
}); 

app.get('/login', function(req,res)
{
    res.sendFile(__dirname + '/public' + '/login.html');
}); 

app.get('/8bythestreet-review', function(req,res)
{
    res.sendFile(__dirname + '/public' + '/8bythestreet-review.html');
}); 

app.get('/maxims-review', function(req,res)
{
    res.sendFile(__dirname + '/public' + '/maxims-review.html');
}); 

app.get('/flightcafe-review', function(req,res)
{
    res.sendFile(__dirname + '/public' + '/flightcafe-review.html');
}); 

app.get('/cassalu-review', function(req,res)
{
    res.sendFile(__dirname + '/public' + '/cassalu-review.html');
}); 

app.get('/dearjoe-review', function(req,res)
{
    res.sendFile(__dirname + '/public' + '/dearjoe-review.html');
}); 





// Creates a local server at port 5000

var server = app.listen(5000, function()
{
    console.log("Listening at port 5000");
});