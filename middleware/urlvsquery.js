const express = require('express');
const app = express();
const PORT = 8000;

const router = require ('express').Router()

// Query parameters:
// query parameters are like variables passed in the URL with a question mark. and a key = value pair.
// http://localhost:8000/users?name=chase
// after I use a question mark and a key=value pair, I will now have access to that value in my request object.
// req.query.name = chase
router.route('/')
    .get((req, res) => {
        // if we have query parameters,
        // we will say hello to the name in the query parameters.
        if (req.query.name) {
            const name = req.query.name
            res.send(`Hello ${name}`)
        } else {
            res.send('Hello World')
        }
    })

// URL params:
// URL params are like variables passed in the url, similar to query parameters.
// http://localhost:8000/users/chase
// The difference is that they are included in the URL itself.
// meaning, there is a new route for the URL parameter.
router.route('/name/:name')
    .get((req, res) => {
        const name = req.params.name
        res.send(`Hello ${name}`)
    })

// URL parameters and Query parameters have different use cases.
// URL parameters are used to pass data to the server.
// Query parameters are used to include information for a get request.
// Query parameters are included in the URL.
// URL parameters are included in the URL.


app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})


// Both URL parameters (also known as route parameters) and query parameters are used to pass information 
// to the server via the URL, but they serve different purposes and have different use cases. 
// Here are the main differences and reasons why you might choose one over the other:

// URL Parameters (Route Parameters)
// Usage:

// URL parameters are part of the URL path itself and are typically used to identify a specific 
// resource or a subset of resources.
// They are used when the information is essential to identify the resource being requested.
// Example:

// http://example.com/users/123 – Here, 123 is a URL parameter identifying a specific user.
// Advantages:

// RESTful Design: URL parameters align well with RESTful API design principles, where URLs represent 
// resources and actions are performed on these resources.
// Semantic and Hierarchical: URL parameters provide a clear and hierarchical way to access resources. 
// It’s easy to understand the structure and relationship between resources.
// Path-Based Access: They are ideal for accessing a specific resource or a collection of resources, 
// such as users/123/orders/456.
// Disadvantages:

// Limited Flexibility: URL parameters are less flexible for optional parameters or for passing complex or 
// large amounts of data.
// Caching Issues: URLs with parameters can be more difficult to cache effectively, 
// as each unique URL may be treated as a different resource.
// Query Parameters
// Usage:

// Query parameters are appended to the URL after a question mark (?) and are typically used to filter, 
// sort, or paginate resources.
// They are used for optional or additional information that modifies the response but does not necessarily identify
// a specific resource.
// Example:

// http://example.com/users?role=admin&status=active 
// Here, role and status are query parameters used to filter the list of users.
// Advantages:

// Flexibility: Query parameters are more flexible for filtering, sorting, and paginating resources. 
// They can easily be added or omitted without changing the URL structure.
// Optional Parameters: They are ideal for optional parameters that may not always be required.
// Dynamic Queries: They allow for dynamic queries, making it easier to construct URLs programmatically based 
// on user input or other conditions.
// Disadvantages:

// Less Semantic: URLs with query parameters can be less semantic and harder to understand at a glance compared 
// to hierarchical URL parameters.
// Complexity: URLs can become complex and harder to manage with many query parameters.
// When to Use Each
// Use URL Parameters When:

// The parameter is a necessary part of the URL path and essential to identify a resource.
// You are designing a RESTful API and want to follow resource-based URL design principles.
// You have a clear and hierarchical resource structure.
// Use Query Parameters When:

// The parameter is optional or provides additional information to filter, sort, or paginate the resource.
// You need to pass multiple optional parameters that can be combined in different ways.
// You want to allow for flexible and dynamic querying of resources.