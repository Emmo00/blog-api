# blog-api

Blogging API where users can create, read, update, and delete blog posts.

## Environment Variables

```bash
PORT=

SECRET=

MONGO_URL=
```

## Routes

```txt
POST    /api/auth/register      Create user
POST    /api/auth/login         Login user

GET     /api/articles           Get articles
GET     /api/articles/:id       Get one article
POST    /api/articles           Create article(for authenticated users)
PUT     /api/articles/:id       Update articles(for authenticated users)
DELETE  /api/articles/:id       Delete article(for authenticate users)
```

## Setup

- Clone the repo and `cd` into the project directory.

- Run `npm install` to install dependencies.

- Run `npm run start` to start the api server.
