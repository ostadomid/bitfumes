const users = require('./users');
const db = require('./quotes.json');


const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const express = require('express');
const app = express();

const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;



passport.use(new LocalStategy({ usernameField: 'email' }, (email, password, done) => {
    let found = users.find(user => user.email === email && user.password === password);
    if (!found) {
        done(null, false, { message: 'Invalid Credentials!' });
    } else {
        done(null, found, { message: 'Welcome dear' });
    }
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());

const canAccessAPI = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        try {
            if (jwt.verify(token, process.env.TOKEN_SECRET)) {
                return next();
            }
        } catch (e) {
            return res.status(401).json({ error: true, message: 'Invalid Token' });
        }
    } else {
        return res.status(401).json({ error: true, message: 'Invalid Headers' });;
    }
}

app.get('/quotes/', canAccessAPI, (req, res) => {
    console.dir(req.query.page * 1)

    const page = req.query._page * 1 || 1;
    const limit = req.query._limit * 1 || 20;
    const total = db.quotes.length;
    const maxPage = Math.ceil(total / limit);

    if (page > maxPage) {
        return res.json({ quotes: [] });
    }
    const data = db.quotes.slice((page - 1) * limit, (page - 1) * limit + limit)
    return res.json({ quotes: data });

})

app.post('/login', (req, res) => {
    console.log(req.body)
    passport.authenticate('local', (err, user, extra) => {
        if (err || !user) {
            return res.json({ error: true, message: extra.message });
        }
        let data = { id: user.id };
        let token = jwt.sign(data, process.env.TOKEN_SECRET);
        return res.json({ error: false, token });
    })(req, res);
})


app.listen(5000);
console.log('Server running on port 5000');

