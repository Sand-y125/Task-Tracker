const UserModel = require('../models/UserModel');

const getAllUsers = (req, res) => {
    res.status(200).json(UserModel.getAllUsers());
};

const getUserById = (req, res) => {
    const user = UserModel.getUserById(req.params.id);

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
};

const createUser = (req, res) => {
    console.log("POST /users called");
    console.log(req.body);

    const newUser = UserModel.createUser(req.body);

    console.log(UserModel.getAllUsers());

    res.status(201).json(newUser);
};

const updateUser = (req, res) => {
    const updatedUser = UserModel.updateUser(req.params.id, req.body);

    if (!updatedUser) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(updatedUser);
};

const deleteUser = (req, res) => {
    const deletedUser = UserModel.deleteUser(req.params.id);

    if (!deletedUser) {
        return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
        message: "User deleted successfully"
    });
};

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};