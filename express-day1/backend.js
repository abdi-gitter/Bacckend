const express = require('express');
const app = express();
const cors = require('cors');

// Middleware to handle CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Logging middleware
app.use((req, res, next) => {
    console.log("REQ BODY:");
    console.log(req.body);
    console.log("----------------");

    console.log("USERS:");
    console.log(users);
    console.log("----------------");
    next();
});

// In-memory user data
let users = [
    { id: 1, name: "Chase", age: 36 },
    { id: 2, name: "Abdisa", age: 25 },
    { id: 3, name: "Kennth", age: 30 },
    { id: 4, name: "Ahmed", age: 35 },
    { id: 5, name: "Gulnar", age: 27 }
];

// Helper function to generate a unique ID
const generateId = () => {
    if (users.length === 0) return 1;
    const ids = users.map(user => user.id);
    return Math.max(...ids) + 1;
};

// User controller
const User = {
    listUsers: (req, res) => {
        res.json(users);
    },
    getUser: (req, res) => {
        const id = parseInt(req.params.id);
        const user = users.find(user => user.id === id);
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    },
    createUser: (req, res) => {
        const { name, age } = req.body;
        if (!name || !age) {
            return res.status(400).json({ error: 'Name and age are required' });
        }
        const user = { id: generateId(), name, age: parseInt(age)};
        users.push(user);
        res.status(201).json(user);
    },
    updateUser: (req, res) => {
        const id = parseInt(req.params.id);
        const { name, age } = req.body;
        const user = users.find(user => user.id === id);
        if (user) {
            if (name !== undefined) user.name = name;
            if (age !== undefined) user.age = parseInt(age);
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    },
    deleteUser: (req, res) => {
        const id = parseInt(req.params.id);
        const index = users.findIndex(user => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            res.json({ message: 'User deleted' });
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    }
};

// User routes
app.route('/users')
    .get(User.listUsers)
    .post(User.createUser);

app.route('/users/:id')
    .get(User.getUser)
    .put(User.updateUser)
    .delete(User.deleteUser);

// Start the server
app.listen(3000, () => console.log('SERVER RUNNING!'));