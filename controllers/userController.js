const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { secret } = require('../config/jwt');

exports.register = async (req, res) => {
    const { username, password, name } = req.body;

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        const user = await User.create({ username, password: hashedPassword, name });
        res.status(201).send({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(500).send({ message: 'Error registering user.' });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send({ message: 'User not found.' });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ token: null, message: 'Invalid password.' });

    const token = jwt.sign({ id: user._id }, secret, { expiresIn: '24h' });

    res.status(200).send({ token });
};

exports.findPeople = async (req, res) => {
    const { name } = req.query;

    const users = await User.find({ name: new RegExp(name, 'i') }, 'id name username');

    res.status(200).send(users);
};
