# Node.js API Task Manager

This project is a Task Manager API built with Node.js. It allows users to create, read, update, and delete tasks. The API is designed to be simple and easy to use, providing a robust foundation for managing tasks in any application.

## Objective

The objective of this project is to provide a basic example of how to work with Express.js, demonstrating how to create a simple and functional Task Manager API.
## Features
- User authentication and authorization
- Task creation and management
- Task categorization
- RESTful API design
- Error handling and validation using Joi
- JWT token-based authentication
- Password hashing with bcrypt
- Middleware for request logging
- Environment configuration with dotenv
- CORS support for cross-origin requests
- Input sanitization to prevent injection attacks

## Technologies Used

- Node.js
- Express.js

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/nodejs-api-task-manager.git
    ```
2. Navigate to the project directory:
    ```bash
    cd nodejs-api-task-manager
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```

## Usage

1. Start the server:
    ```bash
    npm start
    ```
2. The API will be available at `http://localhost:3000`.


## Test 

4. Import the Postman collection and environment:
    - Open Postman and click on the "Import" button.
    - Select the `postman` folder located in the project directory.
    - Import the collection and environment files.

5. Use the `users/login` endpoint to authenticate:
    - In Postman, select the imported environment.
    - Send a POST request to the `users/login` endpoint with the following credentials:

```json
{
    "username": "user",
    "password": "123"
}
```

or

```bash
curl --location 'localhost:3000/login' \
--header 'Content-Type: application/json' \
--data '{
    "username": "user",
    "password": "123"
}'
```

This will generate a token like the following:

```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIiLCJpYXQiOjE3MzYwODkwNDJ9.vXv9yx45NtzWOmeMqide0E3mts5cAkRbNFMjBuMtFHc"
}
```

This token must be passed as Bearer authentication for using the rest of the endpoints.

## API Endpoints

- `GET /tasks` - Retrieve all tasks
- `GET /tasks/:id` - Retrieve a single task by ID
- `POST /tasks` - Create a new task
- `PATCH /tasks/:id` - Update a task by ID
- `DELETE /tasks/:id` - Delete a task by ID

### User Endpoints
- `POST /users/login` - Authenticate a user and generate a token
- `GET /users` - Retrieve all users
- `GET /users/:id` - Retrieve a single user by ID
- `POST /users` - Create a new user
- `PATCH /users/:id` - Update a user by ID
- `DELETE /users/:id` - Delete a user by ID

### Category Endpoints

- `GET /categories` - Retrieve all categories
- `GET /categories/:id` - Retrieve a single category by ID
- `POST /categories` - Create a new category
- `PATCH /categories/:id` - Update a category by ID
- `DELETE /categories/:id` - Delete a category by ID


Use these credentials to log in and test the various endpoints provided by the API.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License. 
