const connection = require('../config/connection');
const { User, Thought } = require('../models');
const data = require('./data.js');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});

  await Thought.deleteMany({});

  const users = data.data;

  console.log(users);
  // Add users to the collection and await the results
  await User.collection.insertMany(users);

  // Log out the seed data to indicate what should appear in the database
  console.table(data);
  console.info('Seeding complete! 🌱');
  process.exit(0);
});
