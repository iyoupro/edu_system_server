const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();


const user = require('./routes/api/user');
const course = require('./routes/api/course');
const task = require('./routes/api/task');

const db = require('./config/key').mongoURI;
mongoose.connect(db, { useNewUrlParser: true })
    .then(() => console.log('Mongodb Connected'))
    .catch(err => console.log(err));
app.use(passport.initialize());
require('./config/passport')(passport);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/user', user);
app.use('/api/course', course);
app.use('/api/task', task);
const port = process.env.PORT || 5000;
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
});