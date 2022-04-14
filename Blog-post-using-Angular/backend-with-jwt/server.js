require('dotenv').config();
const mongoDBConnectionString = process.env.MONGO_URI;
const HTTP_PORT = process.env.PORT || 8080;

const express = require('express');
const bodyParser = require('body-parser');

const cors = require('cors');
const dataService = require('./modules/data-service.js');
const userService = require('./modules/user-service.js');

var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportJWT = require('passport-jwt');

const data = dataService(mongoDBConnectionString);
const app = express();

// JSON Web Token Setup
var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

// Configure its options
var jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');

// IMPORTANT - this secret should be a long, unguessable string
// (ideally stored in a "protected storage" area on the web server).
// We suggest that you generate a random 50-character string
// using the following online tool:
// https://lastpass.com/generatepassword.php

jwtOptions.secretOrKey = process.env.SECRET_KEY;

var strategy = new JwtStrategy(jwtOptions, function (jwt_payload, next) {
  console.log('payload received', jwt_payload);

  if (jwt_payload) {
    // The following will ensure that all routes using
    // passport.authenticate have a req.user._id, req.user.userName, req.user.fullName & req.user.role values
    // that matches the request payload data
    next(null, {
      _id: jwt_payload._id,
      userName: jwt_payload.userName,
      fullName: jwt_payload.fullName,
      role: jwt_payload.role,
    });
  } else {
    next(null, false);
  }
});

passport.use(strategy);

app.use(passport.initialize());
app.use(bodyParser.json());
app.use(cors());

app.post('/api/register', (req, res) => {
  userService
    .registerUser(req.body)
    .then((msg) => {
      res.json({ message: msg });
    })
    .catch((msg) => {
      res.status(422).json({ message: msg });
    });
});

app.post('/api/login', (req, res) => {
  userService
    .checkUser(req.body)
    .then((user) => {
      var payload = {
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        role: user.role,
      };

      var token = jwt.sign(payload, jwtOptions.secretOrKey);

      res.json({ message: 'login successful', token: token });
    })
    .catch((msg) => {
      res.status(422).json({ message: msg });
    });
});

app.post(
  '/api/posts',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    data
      .addNewPost(req.body)
      .then((msg) => {
        res.json({ message: msg });
      })
      .catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
      });
  }
);

// IMPORTANT NOTE: ?tag=#funny wll not function, but ?tag=funny will
app.get('/api/posts', (req, res) => {
  data
    .getAllPosts(
      req.query.page,
      req.query.perPage,
      req.query.category,
      req.query.tag
    )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: `an error occurred: ${err}` });
    });
});

app.get('/api/categories', (req, res) => {
  data
    .getCategories()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: `an error occurred: ${err}` });
    });
});

app.get('/api/tags', (req, res) => {
  data
    .getTags()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: `an error occurred: ${err}` });
    });
});

app.get('/api/posts/:id', (req, res) => {
  data
    .getPostById(req.params.id)
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.json({ message: `an error occurred: ${err}` });
    });
});

app.put('/api/posts/comment/:id', (req, res) => {
  data
    .updatePostById(req.body, req.params.id)
    .then((msg) => {
      res.json({ message: msg });
    })
    .catch((err) => {
      res.json({ message: `an error occurred: ${err}` });
    });
});

app.put(
  '/api/posts/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    data
      .updatePostById(req.body, req.params.id)
      .then((msg) => {
        res.json({ message: msg });
      })
      .catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
      });
  }
);

app.delete(
  '/api/posts/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    data
      .deletePostById(req.params.id)
      .then((msg) => {
        res.json({ message: msg });
      })
      .catch((err) => {
        res.json({ message: `an error occurred: ${err}` });
      });
  }
);

// Connect to the DB and start the server

userService
  .connect()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      data
        .connect()
        .then(() => {
          console.log('API listening on: ' + HTTP_PORT);
        })
        .catch((err) => {
          console.log('unable to start the server: ' + err);
          process.exit();
        });
    });
  })
  .catch((err) => {
    console.log('unable to start the server: ' + err);
    process.exit();
  });
