require('dotenv').config();

const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { where } = require('sequelize');



async function registerUser (req, res) {
    const { username, password } = req.body;
    console.log('Incoming request: POST /api/register');
    console.log('Request Body: ', req.body);

    try {
        const existingUser = await User.findOne({ where: {username} });
        console.log('Existing User:', existingUser);

        if (existingUser) {
            console.log('Username already taken');
            return res.status(400).json({ error: 'Username is already taken '});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword});
        res.json({message: 'User registered successfully'});
    } catch (error) {
        console.error('Error registering new user:', error);

        if (error.name === 'SequelizeUniqueConstraintError' || error.original.code === '23505') {
            return res.status(400).json({ error: 'Username already taken' });
        }

        res.status(400).json({error: error.message });
    }
}

async function signinUser (req, res) {
    const { username, password} = req.body;

    try {
        const user = await User.findOne({ where: {username} });

        if(!user) {
            return res.status(400).json({ message: 'Invalid Username or Password'});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid Username or Password'});
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {expiresIn: '1h' });
        res.json({ token });
    } catch(error) {
        res.status(500).json({message: 'Server Error'});
    }
}

async function renewToken (req, res) {
    const {token} = req.body;
    if (!token) {
        return res.status(400).json({message:'No token provided'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const newToken = jwt.sign ({ id: decoded.id }, process.env.JWT_SECRET, { expiresIn: '1h'});

        res.json({token: newToken});
    } catch (error) {
        res.status(401).json({message: 'invalid or expired token'});
    }
}

async function checkUserName (req, res) {
    const { username } = req.body;
    const user = await User.findOne({where : {username}});

    if (user) {
        return res.json({exists: true});
    }
    return res.json({exists: false});
}

module.exports = {
    registerUser,
    signinUser,
    renewToken,
    checkUserName,
};
