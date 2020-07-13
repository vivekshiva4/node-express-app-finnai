import express from 'express';
import db from './db/db';
import bodyParser from 'body-parser';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';

// Set up the express app
const app = express();

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
//Set up to ejs view
app.set('view engine', 'ejs')


// get all users
app.get('/user', (req, res) => {
    return res.status(200).json({
        success: true,
        message: 'Users retrieved successfully',
        data: db
    })
});

//create a new user with uuid
app.post('/user', (req, res) => {
    if(!req.body.firstName) {
        return res.status(400).json({
            success: false,
            message: 'first name is required'
        });
    } else if(!req.body.lastName) {
        return res.status(400).json({
            success: false,
            message: 'last name is required'
        });
    } else if(!req.body.email) {
        return res.status(400).json({
            success: false,
            message: 'email  is required'
        });
    }

    const id  = uuidv4();
    const user = {
        id: id,
        first_name: req.body.firstName,
        last_name: req.body.lastName,
        email: req.body.email
    }
    db.push(user);

    return res.status(201).send({
        success: true,
        message: 'user added successfully',
        user : user
    })
});

//get user by id
app.get('/user/:id', (req, res) => {
    const id = req.params.id;

    db.map((user) => {
        if (user.id === id) {
            return res.status(200).json({
                success: true,
                message: 'user retrieved successfully',
                user: user,
            });
        }
    });
    return res.status(404).json({
        success: false,
        message: 'user does not exist',
    });
});

//Base route path for web view.
app.get('/', function (req, res) {
    res.render('index', {success:true, users:db});
})


const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});

module.exports = app
