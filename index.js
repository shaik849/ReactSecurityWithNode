const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const authRouter = require('./Routers/Auth');
require('dotenv').config();

app.use(morgan('dev'));

app.use(cors('*'));
var bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.use(express.text({ limit: '50mb', type: 'text/html' }));

app.use(express.urlencoded({ limit: '50mb', extended: true }));

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('connected....');
}).catch(err => {console.error(err);});

app.use('/api', authRouter);
app.listen(process.env.PORT || 3030, () =>{
    console.log('listening on port '+process.env.PORT);
})