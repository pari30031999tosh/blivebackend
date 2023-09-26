const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieparser = require('cookie-parser')

const mongoose = require('mongoose');
const loginroutes = require('./routes/loginRoutes');
const libraryroutes = require('./routes/libraryRoutes');
require("dotenv").config();
const PORT = 8000;

mongoose.connect('mongodb+srv://pari1999tosh:tT87vpFD@cluster0.uej21xs.mongodb.net/flytbase?retryWrites=true&w=majority')
.then(res => console.log("db connected=============="))
.catch(err => console.log('error connecting to database', err))

const app = express();

app.use(cookieparser())
app.use(express.json());
app.use(cors())


app.use('/users', loginroutes);
app.use('/library', libraryroutes);


app.listen(PORT, () => console.log("server is listening at port 3000"))