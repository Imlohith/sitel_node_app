const User = require('../model/user.model');

//search user by ID
const getUserById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (err) {
        throw new Error(`Error getting user with id ${id}: ${err.message}`);
    }
}

//create user
const createUser = async (userData) => {
    try {
        const user = new User(userData);
        await user.save();
        return user;
    } catch (err) {
        throw new Error(`Error creating user: ${err.message}`);
    }
}

//delete user by ID
const deleteUserById = async (id) => {
    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            throw new Error(`User with id ${id} not found`);
        }
        return user;
    } catch (err) {
        throw new Error(`Error deleting user with id ${id}: ${err.message}`);
    }
}


module.exports = {
    getUserById,
    createUser,
    deleteUserById
}