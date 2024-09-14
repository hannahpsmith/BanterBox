const { User, Thought } = require('../models');

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error' });
            console.error(`Error: ${error}`);
        }
    },

    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
            .select('-__v');

            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }

            res.status(200).json(user);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error' });
            console.error(`Error: ${error}`);
        }
    },

    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
    
            res.status(201).json({ data: user, message: 'User created successfully!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(`Error: ${error}`);
        }
    },

    async createNewUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.status(200).json({user, message: 'User created successfully!' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(`Error: ${error}`);
        }
    },
    
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate({_id: req.params.userId}, req.body, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            res.status(200).json({ user, message: 'User updated successfully!' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error' });
            console.error(`Error: ${error}`);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete({ _id: req.params.userId });
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            const { deletedThoughts } = await Thought.deleteMany({ username: user.username });
            if (deletedThoughts === 0) {
                return res.status(200).json({ message: 'User successfully deleted!  No thoughts to delete' });
            }
            res.status(200).json({ message: 'User and all associated thoughts successfully deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error' });
            console.error(`Error: ${error}`);
        }
    },

    async addFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: {friends: req.params.friendId }}, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            res.status(200).json({user, message: 'Friend successfully added!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error' });
            console.error(`Error: ${error}`);
        }
    },

    async removeFriend(req, res) {
        try {
            const user = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: {friends: req.params.friendId }}, { new: true });
            if (!user) {
                return res.status(404).json({ message: 'No user found' });
            }
            res.status(200).json({user, message: 'Friend successfully deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error' });
            console.error(`Error: ${error}`);
        }
    }
}