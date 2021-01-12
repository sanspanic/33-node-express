const express = require("express");
const axios = require("axios");
const ExpressError = require("./expressError");

const app = express();
app.use(express.json());

app.post("/", function (req, res, next) {
  try {
    const promiseArr = req.body.developers.map((username) => {
      return axios.get(`https://api.github.com/users/${username}`);
    });
    Promise.all(promiseArr).then((results) => {
      const userInfo = results.map((r) => ({
        name: r.data.name,
        bio: r.data.bio,
      }));
      return res.json({ data: userInfo });
    });
  } catch {
    next(err);
  }
});

// 404 handler
app.use(function (req, res, next) {
  return next(new ExpressError("Not Found", 404));
});

// generic error handler
app.use(function (err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status,
    },
  });
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000");
});
