import fs from "fs";
import jwt from "jsonwebtoken";
export const users = JSON.parse(fs.readFileSync("./user.json", "utf-8"));

//save user
export const saveUser = (req, res) => {
  const user = req.body;
  user.id = users[users.length - 1].id + 1;
  users.push(user);
  const updatedUsers = JSON.stringify(users, null, 2);

  fs.writeFileSync("./user.json", updatedUsers, "utf-8");

  res.status(201).json(users[users.length - 1]);
};

//get all users
export const getAllUsers = (req, res) => {
  return res.status(200).json(users);
};

//get user by ID

export const getUserById = (req, res) => {
  const foundUser = users.filter((user) => {
    if (user.id === req.params.id) return user;
  });
  if (foundUser.length > 0) return res.status(200).json(foundUser);
  else return res.status(404).json({ message: "no user with such id found" });
};

//delete by ID
export const deleteById = (req, res) => {
  // Find the user with the specified ID
  const userToDelete = users.find(
    (user) => user.id === parseInt(req.params.id)
  );

  // If user with the specified ID is not found, return a 404 error
  if (!userToDelete) {
    return res
      .status(404)
      .json({ error: `User with ID ${req.params.id} not found` });
  }

  // Create a new array with all users except the one to delete
  const updatedUsers = users.filter((user) => user.id !== userToDelete.id);

  // Update the users array
  users.length = 0;
  Array.prototype.push.apply(users, updatedUsers);

  // Assuming users array is being saved to the data store (e.g., user.json file)
  // Write the updated users array to the user.json file
  fs.writeFileSync("./user.json", JSON.stringify(users, null, 2), "utf-8");

  // Send a 204 (No Content) response since the user has been successfully deleted
  res
    .status(204)
    .json({ message: `User with ID ${req.params.id} deleted successfully` });
};

//login user

export const loginUser = (req, res) => {
  const tempUser = req.body;

  const foundUser = users.find((user) => user.email === tempUser.email);

  if (foundUser) {
    const token = jwt.sign(
      { id: foundUser.id, email: foundUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    return res.status(200).json({ token: token });
  } else {
    return res.status(400).json({ message: "No such user exists" });
  }
};
