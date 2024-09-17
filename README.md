# BanterBox
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Description
This project is a backend API for a social network application, built using MongoDB, Express.js, and Mongoose. The API allows users to share their thoughts, react to friends' thoughts, and manage a friends list. It supports full CRUD functionality for users, thoughts, and reactions, and demonstrates a typical social network's backend architecture using a NoSQL database.

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Credits](#credits)
* [Questions](#questions)

## Installation
Instal dependencies: node server.js.
Ensure MongoDB is installed and running locally.

## Usage
View a video demonstration of the application [here](https://drive.google.com/file/d/1PHp50PDjh40ibJaQvjrpewcTWfZGieyV/view?usp=sharing)

After starting the server, you can use platforms like Insomnia for testing. The API provides the following functionalities:

* Create, update, and delete users and thoughts.
* Add or remove friends from a user's friends list.
* Post reactions to thoughts and remove them.

### API Routes
#### Users
`GET /api/users: Get all users.`

`GET /api/users/:id: Get a single user by ID with populated thought and friend data.`

`POST /api/users: Create a new user.`

`PUT /api/users/:id: Update an existing user.`

`DELETE /api/users/:id: Delete a user (bonus: also deletes associated thoughts).`

#### Friends
`POST /api/users/:userId/friends/:friendId: Add a friend to a user's friend list.`

`DELETE /api/users/:userId/friends/:friendId: Remove a friend from a user's friend list.`

#### Thoughts
`GET /api/thoughts: Get all thoughts.`

`GET /api/thoughts/:id: Get a single thought by ID.`

`POST /api/thoughts: Create a new thought and link it to a user.`

`PUT /api/thoughts/:id: Update an existing thought.`

`DELETE /api/thoughts/:id: Delete a thought.`

#### Reactions
`POST /api/thoughts/:thoughtId/reactions: Add a reaction to a thought.`

`DELETE /api/thoughts/:thoughtId/reactions/:reactionId: Remove a reaction from a thought`

## License
This project is licensed under the MIT license. Please feel free to read the license in full detail [here](https://opensource.org/license/mit)

## Contributing
Please contact me regarding any contributions to the repo.

## Tests
N/A

## Credits
N/A

## Questions
Please contact me with any additional questions.

Github: hannahpsmith (https://github.com/hannahpsmith)

Email: hannahpsmith94@gmail.com
