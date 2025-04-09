# Tech Solve API Documentation

## Models

### User

```md
- name: string, required
- email : string, required, unique
- password : string, required
```

### Question Post

```md
- UserId: string, required
- title : string
- text : string
- aiAnswer : string
```

### Comment

```md
- QuestionPostId: string, required
- UserId : string, required
- text : string
- vote : string
```

## Endpoints

List of available endpoints:

- `POST /auth/register`
- `POST /auth/login`

Routes below need authentication:

- `GET /users`
- `GET /users/profile`
- `POST /questions`
- `GET /questions`
- `GET /questions/my-questions`
- `GET /questions/:id`
- `POST /comments/:questionPostId`
- `PATCH /comments/:id/vote`

Routes below need authorization:

- `PUT /questions/:id`
- `DELETE /questions/:id`
- `PUT /comments/:id`
- `DELETE /comments/:id`

## 1. POST /auth/register

Register new user

Request:

- body:

```json
{
  "name": "string",
  "email": "string",
  "password": "string"
}
```

Response (201 - Created)

```json
{
  "name": "string",
  "email": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Email is exists"
}
OR
{
  "message": "Password is required"
}
```

## 2. POST /auth/login

Login user

Request:

- body:

```json
{
  "email": "string",
  "password": "string"
}
```

Response (200 - OK)

```json
{
  "access_token": "string"
}
```

Response (400 - Bad Request)

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

Response (401 - Unauthorized)

```json
{
  "message": "Invalid email/password"
}
```

## 3. GET /users

Fetch all users

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "name": "string",
    "email": "string"
  },
  ...
]
```

## 4. GET /users/profile

Fetch current user profile

Request:

- headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (200 - OK)

```json
{
  "id": "integer",
  "name": "string",
  "email": "string"
}
```

## 5. POST /questions

Create a new comment for a specific question.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Body:

```json
{
  "text": "string",
  "vote": "string"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "UserId": "integer",
  "QuestionPostId": "integer",
  "text": "string",
  "vote": "integer"
}
```

## 6. GET /questions

Get all questions.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "title": "string",
    "text": "string",
    "aiAnswer": "string"
  },
  ...
]
```

## 7. GET /questions/my-questions

Get all questions created by the current user.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

Response (200 - OK)

```json
[
  {
    "id": "integer",
    "UserId": "integer",
    "title": "string",
    "text": "string",
    "aiAnswer": "string"
  },
  ...
]
```

## 8. GET /questions/:id

Get a specific question by ID.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "id": "integer",
  "UserId": "integer",
  "title": "string",
  "text": "string",
  "aiAnswer": "string"
}
```

Response (404 - Not Found)

```json
{
  "message": "Question not found"
}
```

## 9. PUT /questions/:id

Update a specific question by ID.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "id": "integer"
}
```

- Body:

```json
{
  "title": "string",
  "text": "string"
}
```

Response (200 - OK)

```json
{
  "id": "integer",
  "UserId": "integer",
  "title": "string",
  "text": "string",
  "aiAnswer": "string"
}
```

Response (404 - Not Found)

```json
{
  "message": "Question not found"
}
```

## 10. DELETE /questions/:id

Delete a specific question by ID.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "Question deleted successfully"
}
```

Response (404 - Not Found)

```json
{
  "message": "Question not found"
}
```

## 11. POST /comments/:questionPostId

Create a new comment for a specific question.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "questionPostId": "integer"
}
```

- Body:

```json
{
  "text": "string"
}
```

Response (201 - Created)

```json
{
  "id": "integer",
  "UserId": "integer",
  "QuestionPostId": "integer",
  "text": "string",
  "vote": "integer"
}
```

## 12. PUT /comments/:id

Update a specific comment by ID.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "id": "integer"
}
```

- Body:

```json
{
  "text": "string"
}
```

Response (200 - OK)

```json
{
  "id": "integer",
  "UserId": "integer",
  "QuestionPostId": "integer",
  "text": "string",
  "vote": "integer"
}
```

Response (404 - Not Found)

```json
{
  "message": "Comment not found"
}
```

## 13. DELETE /comments/:id

Delete a specific comment by ID.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "id": "integer"
}
```

Response (200 - OK)

```json
{
  "message": "Comment deleted successfully"
}
```

Response (404 - Not Found)

```json
{
  "message": "Comment not found"
}
```

## 14. PATCH /comments/:id/vote

Update a specific comment vote by ID.

Request:

- Headers:

```json
{
  "Authorization": "Bearer <access_token>"
}
```

- Params:

```json
{
  "id": "integer"
}
```

- Query:

```json
{
  "type": "string" // "up" or "down"
}
```

Response (200 - OK)

```json
{
  "id": "integer",
  "UserId": "integer",
  "QuestionPostId": "integer",
  "text": "string",
  "vote": "integer"
}
```

Response (404 - Not Found)

```json
{
  "message": "Comment not found"
}
```

## Global Error

Response (401 - Unauthorized)

```json
{
  "message": "Invalid token"
}
```

Response (403 - Forbidden)

```json
{
  "message": "You are not authorized"
}
```

Response (500 - Internal Server Error)

```json
{
  "message": "Internal server error"
}
```
