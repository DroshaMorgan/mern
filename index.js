import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://admin:123@cluster0.k7kmp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('WebApp is working!')
})

app.post('/auth/register', (req, res) => {
    console.log(req.body)

    const token = jwt.sign({
        email: req.body.email,
        fullname: 'Den Claus',
    }, 'secret123');

    res.json({
        success: true,
        token,
    })
})

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    
    console.log('Server OK');
})