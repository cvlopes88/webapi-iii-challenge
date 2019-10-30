const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();
const validatePost = require('./users/userRouter')
const validateUser = require('./users/userRouter');
const validateUserId = require('./users/userRouter');
const userRouters = require('./users/userRouter');

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(
    `${req.method} to ${req.url} [${new Date().toISOString()}] `
  )
   next()
};
server.use(morgan('dev'));
server.use(helmet());
server.use(validateUser);
server.use(validatePost);
server.use(validateUserId);
server.use(logger);

server.use('/api/users', userRouters);
server.use(express.json());
module.exports = server;
