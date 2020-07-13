# Node Express ejs App
==========================

Included in this folder is a Node.js web server which includes an API and a
skeleton.

To install and start the node server:

```bash
npm install
npm start
```

Test using Jest
-------------------------------
The run the unit tests
```bash
npm test
```

API
-------------------------------

web and server is served at http://localhost:5000/.

The API provides the following methods:


`GET /user/`
---------------

Returns a JSON array of users.

Request:

```bash
curl http://localhost:5000/user/
```

Response:

```json
[
    {
            "id": "cb429451-c748-4826-91a1-9d9c111df72e",
            "first_name": "vivek",
            "last_name": "shiva",
            "email": "vivekshiva4@gmail.com"
        },
        {
            "id": "e5cb4d0d-d1d3-4a41-bc9d-fc1e63af1977",
            "first_name": "vi",
            "last_name": "shiva",
            "email": "vivekshiva44@gmail.com"
        },
    ...
]
```

`GET /user/:id/`
---------------------

Returns a JSON object for a user with given `id`.

Request:

```bash
curl http://localhost:5000/user/e5cb4d0d-d1d3-4a41-bc9d-fc1e63af1977/
```

Response:

```json
{
    "success": true,
    "message": "user retrieved successfully",
    "user": {
        "id": "e5cb4d0d-d1d3-4a41-bc9d-fc1e63af1977",
        "first_name": "vi",
        "last_name": "shiva",
        "email": "vivekshiva44@gmail.com"
    }
}
```


`POST /user/` 
-------------------------------------------

Saves a user and returns the user obj.

Request:

```bash
curl http://localhost:5000/user/ -X POST -d '{ "firstName": "vivek", "lastName": "shiva" , "email": "vivekshiva4@gmail.com}' -H "Content-Type: application/json"
```


Response:

```json
{
    "success": true,
    "message": "user added successfully",
    "user": {
        "id": "e5cb4d0d-d1d3-4a41-bc9d-fc1e63af1977",
        "first_name": "vi",
        "last_name": "shiva",
        "email": "vivekshiva44@gmail.com"
    }
}
```


