const express = require('express');
const router = require('./routes');
const signInController = require('./controller/signin');

const app = express();
app.use(express.json()); 
app.use(express.urlencoded());   // This is used as body-parcer is deprecated
app.use('/', router);

const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT;
const Web = process.env.HOST + port;

//Static Files
//To prevent from sending any form data
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));

//Set Views
app.set('views', './views');
app.set('view engine', 'ejs');

// Render Home screen
app.get('/', (req, res) => {
    res.render('index');
})

//Listen on port 3000
app.listen(port, () => console.info(`Server running at ${Web}`));