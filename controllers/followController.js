const Follow = require('../models/Follow');

exports.follow = async (req, res) => {
    const { userId } = req.body;

    try {
        await Follow.create({ followerId: req.userId, followingId: userId });
        res.status(200).send({ message: 'Followed successfully.' });
    } catch (error) {
        res.status(500).send({ message: 'Error following user.' });
    }
};
