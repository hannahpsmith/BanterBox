const { Thought, User } = require('../models');

module.exports = {

    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(200).json(thoughts);
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(`Error: ${error}`);
        }
    },

    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');
    
            if (!thought) {
                return res.status(404).json({ message: `Invalid thought ID: ${req.params.thoughtId}.` });
          }
    
            res.status(200).json({ thought });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(`Error: ${error}`);
        }
    },

    async createThought(req, res) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (!user) {
                return res.status(404).json({ message: 'Invalid Username' 
                });
            }
            const thought = await Thought.create(req.body);
            await User.findByIdAndUpdate( user._id , { $addToSet: { thoughts: thought._id }}, { new: true });

            res.status(200).json({thought, message: 'Thought created!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(`Error: ${error}`);
        }
    },

    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId }, req.body, { new: true }
            );
    
            if (!thought) {
              res.status(404).json({ message: `Invalid thought ID` });
            }
    
            res.status(200).json({ data : thought, message: 'Thought updated successfullly!' });
        } catch (error) {
            res.status(500).json({error, message: 'Internal server error.' });
            console.error(`Error: ${error}`);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
          
            if (!thought) {
                return res.status(404).json({ message: `Invalid thought ID` });
          }
          
            const user = await User.findOneAndUpdate(
                { username: thought.username }, 
                { $pull: {thoughts: req.params.thoughtId }}, 
                { new: true }
          );
    
            res.status(200).json({ message: `Thought successfully deleted!` });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(`Error: ${error}`);
        }
    },

    async createReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, { $addToSet: { reactions: req.body }}, { new: true });

            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }
            
            res.status(200).json({ thought, message: 'Reaction added successfully!' });
        } catch(error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(`Error: ${error}`);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate({ _id: req.params.thoughtId }, {$pull: { reactions: {_id: req.params.reactionId}}}, { new: true });
            if (!thought) {
                return res.status(404).json({ message: 'No thought found' });
            }
            res.status(200).json({ thought, message: 'Reaction successfully deleted!' });
        } catch (error) {
            res.status(500).json({ error, message: 'Internal server error.' });
            console.error(`Error: ${error}`);
        }
    }
}
