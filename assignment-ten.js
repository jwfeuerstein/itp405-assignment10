const express = require("express");
const axios = require("axios");
const fs = require("fs");

const app = express();

app.get("/api/github/:username", (request, response) => {
  let username = request.url.substring(12);
  let filename = `${username}.txt`;

  fs.readFile(filename, "utf8", (error, data) => {
    if (!error) {
      response.json({
        repoCount: Number(data),
      });
    } else {
      axios
        .get(`https://api.github.com/users/${username}`)
        .then((apiResponse) => {
          let count = apiResponse.data.public_repos;

          fs.writeFile(filename, count, (error) => {
            console.log("Wrote to file.");
          });

          response.json({
            repoCount: count,
          });
        });
    }
  });
});

app.listen(8000);
