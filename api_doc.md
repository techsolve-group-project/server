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
    "id": "string",
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
  "id": "string",
  "name": "string",
  "email": "string"
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
