const express = require("express");
const User = require("./user");
const router = express.Router();

// insert a user into database route

router.post("/users", async (req, res) => {
  try {
    const user = new User({
      title: req.body.title,
      body: req.body.body,
    });
    await user.save();
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// get all users

router.get("/users", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// search by Name
router.get("/users/:title", async (req, res) => {
  const title = req.params.title;
  try {
    const users = await User.find({
      $or: [{ title: { $regex: title, $options: "i" } }],
    });

    res.json(users);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error);
  }
});

// update a user

router.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { title, body } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

// delete a user

router.delete("/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send(error.message);
  }
});

module.exports = router;
