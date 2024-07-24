const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser (req, res) {
    const { username, password } = req.body;
    console.log('Response data: ', req.body);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, password: hashedPassword});
        res.json({message: 'User registered successfully'});
    } catch (error) {
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

        const token = jwt.sign({ id: user.id }, 'letsgrindit', {expiresIn: '1h' });
        res.json({ token });
    } catch(error) {
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = {
    registerUser,
    signinUser,
};
