const userController = {
    users: [
        'chase',
        'abdisa',
        'ahmed',
        'kenneth',
        'gulnar'
    ],
    checkUser: (req, res) => {
        if (req.body.user) {
            const user = req.body.user.toLowerCase();
            if (userController.users.includes(user)) {
                res.status(200).json(true); // Use .json() to send JSON response
            } else {
                res.status(404).json(false); // Use .json() to send JSON response
            }
        } else{
            res.status(400).json({ error: 'No user found in request body!' }); // Send error as JSON
        }
    },
    checkByParam: (req, res) => {
        // users/name
        const name = req.params.name.toLowerCase();
        console.log(name)
        if (userController.users.includes(name)) {
            res.status(200).json(true); // Use .json() to send JSON response
        } else {
            res.status(404).json(false); // Use .json() to send JSON response
        }
    },
    listUsers: (req, res) => {
        // This is just to show an example of a query parameter
        if(req.query.name){console.log(req.query.name)}
        res.status(200).json(userController.users); // Use .json() to send JSON response
    },
}
 
module.exports = userController;
