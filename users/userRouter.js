const express = require('express');

const router = express.Router();

const User = require('./userDb');

router.post('/', validateUser, (req, res) => {
    User.insert(req.body)
    .then(user => {
        if (req.body){
            res.status(201).json(user)
        }else{
            res.status(400).json({message: 'user needs a name '})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'user could not be created'})
    })

});

router.post('/:id/posts', validatePost, (req, res) => {

   const postInfo = { ...req.body, id: req.params.id };

    User.insert(postInfo)
    .then(posts => {
        if(posts){
            res.status(201).json(posts)
        }else{
            res.status(400).json({message: 'please provide the comment'})
        }
    })
    .catch(err => {
        res.status(400).json({error: 'the post could not be created'})
    });

});

router.get('/', (req, res) => {
User.get(req.query)
.then(users => {
    res.status(200).json(users)
})
.catch(err => {
    res.status(500).json({error: "couldnt retrieve users"})
})
});

router.get('/:id', validateUserId, (req, res) => {

    User.getById(req.params.id)
    .then(users =>{
        if(users){
            res.status(200).json(users)
        }else{
            res.status(404).json({message: "user not found"})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'error finding user'})
    })
});

router.get('/:id/posts', (req, res) => {

    User.getUserPosts(req.params.id)
    .then(user => {
        res.status(200).json(user)
    })
    .catch(err => {
        res.status(500).json({error: 'error getting the posts'})
    })


});

router.delete('/:id', (req, res) => {

User.remove(req.params.id)
.then(user => {
    if (user > 0){
        res.status(200).json({message: 'the user has been deleted'})
    }else{
        res.status(404).json({message: 'user could not be found'})
    }
})
.catch(err => {
    res.status(500).json({error: 'error removing user'})
});

});

router.put('/:id', validateUserId, (req, res) => {

    User.update(req.params.id, req.body)
    .then (user => {
        if (user) {
            res.status(200).json(user);
        }else{
            res.status(404).json({message: 'the user could not be found'})
        }
    })
    .catch(err => {
        res.status(500).json({error: 'user could not be updated'})
    })
});

//custom middleware

function validateUserId(req, res, next) {

    const userId = req.params.id;
    if (userId){ 
        if(userId ){
            next();
        }else{
            res.status(404).json({message: 'user does not exist '})
        };
    }

};

function validateUser(req, res, next) {
    const user = req.body;

    if(user){
        next()
    }else if (user === null) {
 res.status(400).json({message: 'missing user data'})

    }else{
        res.status(400).json({message: 'missing required field'})
    }

};

function validatePost(req, res, next) {

if (req.body){
    next()
}else if (req.body === null) {
    res.status(400).json({message: 'missing post data'})
}else{
    res.status(400).json({message: 'missing required field'})
}

};

module.exports = validatePost;
module.exports = validateUser;
module.exports = validateUserId;
module.exports = router;
