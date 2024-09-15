const connection = require('../config/connection');
const { User, Thought } = require('../models');

connection.on('error', (error) => {
    console.error('Database connection error:', error);
});

connection.once('open', async () => {
    console.log('Connected to the database.');

    try {
        // Fetch collections to inspect before dropping
        const users = await User.find();
        const thoughts = await Thought.find();

        console.log('Users in the database:', users.length ? users : 'No users found.');
        console.log('Thoughts in the database:', thoughts.length ? thoughts : 'No thoughts found.');

        // Optionally log the full collections

        // Drop the database after logging the collections
        await connection.db.dropDatabase();
        console.log('Database dropped successfully.');

        process.exit(0);
    } catch (error) {
        console.error('Error during database operations:', error);
        process.exit(1);
    }
});
