
const mongoose = require('mongoose');
const userService = require('../services/users.service')
require('dotenv').config()
const User = require('../model/user.model')
const { Types } = require('mongoose');

describe('createUser', () => {

    beforeAll(async () => {
        await mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    test('should connect to the database', async () => {
        expect(mongoose.connection.readyState).toBe(1);
    });

    it('should create a new user', async () => {
        // Create a mock user object to pass as input to the createUser method
        const user = {
            name: 'anderson',
            email: 'anderson@example.com',
            dob: '01-02-2001'
        };

        // Call the createUser method with the mock user object
        const createdUser = await userService.createUser(user);

        // Verify that the createdUser object is not null and contains the expected properties
        expect(createdUser).toBeTruthy();
        expect(createdUser.name).toBe(user.name);
        expect(createdUser.email).toBe(user.email);
        expect(createdUser.dob).not.toBe(user.dob);
    });

    it('should return user by ID', async () => {
        // Call the createUser method with the mock user object
        const userId = '6092f821bb9d897ba87f3a61';
        let userObjectId;
        if (Types.ObjectId.isValid(userId)) {
            userObjectId = Types.ObjectId(userId);
        }
        const user = new User({
            _id: userObjectId,
            name: 'Steve',
            email: 'steve@example.com',
            dob: new Date(1990, 0, 1),
        });

        await user.save();

        const foundUser = await userService.getUserById(userObjectId);
        // Verify that the returnedUser object is not null and contains the expected properties
        expect(foundUser).toBeDefined();
        expect(foundUser._id).toEqual(userObjectId);
        expect(foundUser.name).toEqual('Steve');
        expect(foundUser.email).toEqual('steve@example.com');
        expect(foundUser.dob).toEqual(new Date(1990, 0, 1));

    });


    it('should delete user by ID', async () => {
        // Create a user to delete
        const user = new User({
            name: 'Smith',
            email: 'Smith@example.com',
            dob: new Date(1990, 0, 1),
        });

        await user.save();

        // Find and delete the user by id
        const deletedUser = await userService.deleteUserById(user._id);

        console.log(deletedUser)

        // Assert that the deleted user is the same as the one we created
        expect(deletedUser._id).toEqual(user._id);
        expect(deletedUser.name).toEqual(user.name);
        expect(deletedUser.email).toEqual(user.email);
        expect(deletedUser.password).toEqual(user.password);
        expect(deletedUser.age).toEqual(user.age);

        // Assert that the user no longer exists in the database
        const foundUser = await User.findById(user._id);
        expect(foundUser).toBeNull();
    });

});
