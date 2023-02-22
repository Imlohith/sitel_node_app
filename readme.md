## User API

### Overview

This is an API for managing user data. It allows clients to create, fetch, and delete user data.

### Endpoints
### POST /api/users

Create a user. The request body should contain a JSON object with the following properties:

* \`name \` (string, required): The user's name.
* \` email \` (string, required): The user's email address.
* \` dob \` (date, required): The user's date of birth.

The response body will contain the created user object.

### GET /api/users/:id

Get a user by ID. The id parameter should be a valid MongoDB object ID.

The response body will contain the user object.

### POST /api/users/:id

Delete a user by ID. The id parameter should be a valid MongoDB object ID.

The response body will contain a success message.

## Testing
To run the tests, run npm test. This will run the tests using Jest.
