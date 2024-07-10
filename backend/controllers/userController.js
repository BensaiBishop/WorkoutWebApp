const User = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser (req, res) {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const newUser = await User.create({ username, password: hashedPassword});
        res.json = ({message: 'User registered'});
    } catch (error) {
        res.status(400).json({error: error.message });
    }
}

async function signinUser (req, res) {
    const { username, password} = req.body;
    const user = await User.findOne({ where: {username} });

    if(!user) {
        return res.status(400).json({ message: 'Invalid Username or Password'});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid Username or Password'});
    }

    const token = jwt.sign({ id: user.id }, 'letsgrindit', {expiresIn: '1h' });
    res.json({ token });
}

module.exports = {
    registerUser,
    signinUser,
};
