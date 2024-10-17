const express = require("express");
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// **************************************************************
// Put your implementation here
// If necessary to add imports, please do so in the section above

let users = {
  12345: {
    name: "Jane Doe",
    email: "jane@example.com",
  },
};

function getUserById(userID) {
  if (users[userID] !== undefined) {
    newUser = {
      id: userID,
      name: users[userID].name,
      email: users[userID].email,
    };
    return newUser;
  } else {
    return null;
  }
}

app.get("/users/:id", (req, res) => {
  if (getUserById(req.params.id) !== null) {
    res.send(getUserById(req.params.id));
  } else {
    res.status(404).send("user " + req.params.id + " not found");
  }
});

app.post("/users/", (req, res) => {
  newID = "id" + Math.random().toString(16).slice(2);
  uname = req.body.name;
  email = req.body.email;
  users[newID] = { name: uname, email: email };
  newUser = { id: newID, name: users[newID].name, email: users[newID].email };

  res.status(201).send(newUser);
});

app.put("/users/:id", (req, res) => {
  if (getUserById(req.params.id) !== null) {
    users[req.params.id].name = req.body.name;
    users[req.params.id].email = req.body.email;

    newUser = getUserById(req.params.id);
    res.status(200).send(newUser);
  } else {
    res.status(404);
  }
});

app.delete("/users/:id", (req, res) => {
  if (getUserById(req.params.id) !== null) {
    delete users[req.params.id];
    res.status(204).send("user deleted successfully!");
  } else {
    res.status(404);
  }
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

module.exports = app; // Export the app for testing
