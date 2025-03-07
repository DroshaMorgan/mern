import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { validationResult } from 'express-validator';

import {registerValidator} from './validations/auth.js';

import UserModel from './models/User.js';
import checkAuth from './utils/checkAuth.js';


mongoose.connect('mongodb+srv://admin:123@cluster0.k7kmp.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0')
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());

app.get('/', (res) => {
    res.send('WebApp is working!')
})

app.post('/auth/login', async (req, res) => {
    try {
        const user = await UserModel.findOne({
            email: req.body.email
        });

        // Проверка, что пользователь существует
        if (!user) {
            return res.status(400).json({
                message: 'Пользователь не найден!',
            })
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        // Проверка на верный пароль
        if (!isValidPass) {
            return res.status(400).json({
                message: 'Неверный логин или пароль!',
            })        
        }

        const token = jwt.sign({
            _id: user._id,
        }, 
        'secret123',
        {
           expiresIn: '30d',
        }
        )

        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться!'
        });
    }
});

app.post('/auth/register', registerValidator, async (req, res) => {
    try {
        // Валидация запроса
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
    
        // Шифруем хэш пароль
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        // Создаем документ для БД
        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            passwordHash: hash,
            avatarUrl: req.body.avatarUrl,
        });
    
        const user = await doc.save();

        const token = jwt.sign({
                _id: user._id,
            }, 
            'secret123',
            {
               expiresIn: '30d',
            }
        )
    
        const {passwordHash, ...userData} = user._doc;

        res.json({...userData, token});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось зарегестрироваться!'
        });
    }
});

app.get('/auth/me', checkAuth, async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: 'Пользователь не найден',
            })
        }
        
        const {passwordHash, ...userData} = user._doc;

        res.json(userData);
    } catch (err) {
        res.status(500).json({
            message: 'Нет доступа!'
        });
    }
});

app.listen(4444, (err) => {
    if (err) {
        return console.log(err)
    }
    
    console.log('Server OK');
})