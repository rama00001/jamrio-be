module.exports = (app) => {
    const posts = require('../controllers/post_controller.js');

    // Create a new post
    app.post('/api/posts', posts.create);

    // Retrieve all posts
    app.get('/api/posts', posts.findAll);

    // Retrieve a single Post by id
    app.get('/api/posts/:id', posts.findOne);

    // Update a Post with id
    app.put('/api/posts/:id', posts.update);

    // Delete a Post by id
    app.delete('/api/posts/:id', posts.delete);
}

