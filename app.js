const path = require('path');
const express = require('express');

const userRoutes = require('./routes/users');
const db = require('./data/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(express.urlencoded({ extended: false })); /* parse data that send with enctype="application/x-www-form-urlencoded" 
attribute (declared in form html tag) but now we need another that parse incoming data with file. there is no default function
for that in express, because that we install multer package. Unlike express.urlencoded, multer function defined separately
for each rout (go to routs to see).
*/
app.use(express.static('public'));
app.use('/images', express.static('images'));  // '/images' - path filter, like rout.

app.use(userRoutes);

db.connectToDatabase().then(function () {  //.the default execute when the promise succeed.
  app.listen(3000);
});
