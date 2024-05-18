const Post = require('../models/Post');
const Follow = require('../models/Follow');

exports.createPost = async (req, res) => {
    const { content, mediaUrl } = req.body;

    try {
        const post = await Post.create({ content, mediaUrl, userId: req.userId });
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ message: 'Error creating post.' });
    }
};

exports.getFeed = async (req, res) => {
    try {
        const follows = await Follow.find({ followerId: req.userId });
        const followingIds = follows.map(follow => follow.followingId);

        const posts = await Post.find({ userId: { $in: followingIds } })
            .populate('userId', 'id name username')
            .populate('likes')
            .populate('comments')
            .sort('-createdAt');

        res.status(200).send(posts);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching feed.' });
    }
};

exports.getPostDetails = async (req, res) => {
    const { postId } = req.params;

    try {
        const post = await Post.findById(postId)
            .populate('userId', 'id name username')
            .populate('likes')
            .populate('comments');

        if (!post) return res.status(404).send({ message: 'Post not found.' });

        res.status(200).send(post);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching post details.' });
    }
};
