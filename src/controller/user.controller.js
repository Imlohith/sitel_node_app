const httpErrors = require('http-errors')
const userService = require('../services/users.service')

const fetchUser = async (req, res, next) => {
    try {
        const user = await userService.getUserById(req.params.id);
        if (!user) {
            return next(httpErrors(404, 'User not found'));
        }
        res.json(user);
    } catch (error) {
        next(httpErrors(500, error.message));
    }
}

const addUser = async (req, res, next) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (error) {
        next(httpErrors(500, error.message));
    }
}

const deleteUser = async (req, res, next) => {
    try {
       await userService.deleteUserById(req.params.id)
       res.status(200).send({ message: 'Resource successfully deleted.' });
    } catch (error) {
        next(httpErrors(500, error.message));
    }
}


module.exports = {
    fetchUser,
    addUser,
    deleteUser
}