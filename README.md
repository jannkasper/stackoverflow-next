## Stackoverflow Clone
- Live: https://jkasper-stackoverflow.vercel.app/ (be patient, server is sleeping)

[![Product Name Screen Shot][product-screenshot]](https://github.com/jannkasper/stackoverflow-next/blob/master/screenshot.png)

## :rocket: Tech Stack

- Next
- ReactJs
- Axios
- NodeJs
- Express
- MongoDB
- Mongoose
- Jest

## :warning: Prerequisite

- node
- npm
- mongodb

## :cd: How to run local

```bash
# Clone this repository
$ git clone https://github.com/jannkasper/stackoverflow-next

# Go into server
$ cd stackoverflow-next/server

# Create configuration file
$ echo 'DATABASE_URL=<mongodb-url>' > .env

# Install dependencies
$ npm install

# Start the backend server
$ npm run dev

# On another terminal, go to the client folder
$ cd stackoverflow-next/client

# Create configuration file
$ echo 'SITE_NAME=<server-host>' > .env

# Install dependencies
$ npm install

# Start the frontend client
$ npm run dev
```

## :mag_right: Testing

Make sure mongodb is running before testing the server.

```bash
$ cd stackoverflow-next/server
$ # Create configuration file
$ echo 'TEST_DATABASE_URL=<mongodb-url>' > .env
$ npm run test
```

## :globe_with_meridians: Deploy

#### Deploying Server App on Heroku

-  You will need to have setup a [MongoDB Atlas account and database](https://docs.atlas.mongodb.com/getting-started/).
- Make sure that the cluster has allowlisted connections from anywhere.
- Create a [Heroku](https://dashboard.heroku.com/new-app) new app.
- Go to app settings
- Add the following enviroments.
  - DATABASE_URL (to use your MongoDB connection string)
- Add Nodejs to buildpacks

-
    # Go into the repository
    $ cd whatsapp-react-clone

    # Heroku Setup
    $ npm install -g heroku
    $ heroku login
    $ heroku git:remote -a your-app-name

    # push subdirectory repository with subtree
    $ git subtree push --prefix server heroku master

#### Deploying Client App on Vercel

- [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https%3A%2F%2Fgithub.com%2Fjannkasper%2Fstackoverflow-next&env=SITE_NAME)
- Select client directory
- Add heroku api url to SITE_NAME enviorement
- Finally deploy client application


## :book: Directory Structure

```
├── app/
│   ├── client/
│   │   ├── components/
│   │   ├── constants/
│   │   ├── hooks/
│   │   ├── pages/
│   │   │   ├── questions/
│   │   │   │   ├── [slug].js
│   │   │   │   └── ask.js
│   │   │   ├── users/
│   │   │   │   ├── [username].js
│   │   │   │   └── index.js
│   │   │   ├── _app.js
│   │   │   ├── _document.js
│   │   │   ├── auth.js
│   │   │   ├── index.js
│   │   │   └── tags.js
│   │   │
│   │   ├── public/
│   │   ├── store/
│   │   ├── styles/
│   │   ├── util/
│   │   ├── .env
│   │   ├── next.config.js
│   │   ├── postcss.config.js
│   │   ├── site.config.js
│   │   └── package.json
│   │
│   └── server/
│       ├── controllers/
│       ├── middlewares/
│       ├── models/
│       ├── test/
│       ├── utils/
│       ├── .env
│       ├── app.js
│       ├── config.js
│       ├── index.js
│       ├── jest.config.js
│       ├── routes.js
│       └── package.json
│    
```

## :memo: License

This project is made available under the MIT License.





<!-- MARKDOWN LINKS & IMAGES -->
[product-screenshot]: screenshot.png
