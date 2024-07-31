const tasks = [
    { id: 1, title: "Task 1", description: "Description for Task 1" },
    { id: 2, title: "Task 2", description: "Description for Task 2" },
    { id: 3, title: "Task 3", description: "Description for Task 3" },
    { id: 4, title: "Task 4", description: "Description for Task 4" },
    { id: 5, title: "Task 5", description: "Description for Task 5" },
    { id: 6, title: "Task 6", description: "Description for Task 6" },
];

module.exports = {
    tasks
};

// require('./data')  - This will return the object that is being exported from data.js
// if I say require('./data').tasks, this will return the array of tasks

