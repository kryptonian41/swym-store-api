# Sherlock for the Web 🕵

An API to dig out information about any website be it their tech-stack, traffic, rankings etc.

## Starting the Development Environment 💻

---

Before following any of the steps below. Create a **.env** in the root of the project directory. Here is sample:-

```
MONGODB_URI="localhost:27017"
MONGODB_USERNAME="username"
MONGODB_PASSWORD="password"
BUILTWITH_API_KEY="APIKEY" #in-case you are not using the provided mock API server
```

Let's continue :-

1. Change into the project directory

   `$ cd project-directory`

2. Start MongoDB and Redis instances by using docker-compose. It's not neccessary to use docker-compose you can initiate your own instances for both the services as well. But remember to update the .env file accordingly.

   `$ docker-compose up`

3) BuiltWith has a very small free tier - So I saved the data for some domains into a json file and used json-server to serve as a mock API end-point for presentational purposes. The application has a source module for the actual BuiltWith API endpoint as well, whch can be swapped in anytime as per the needs.

   The mock api currently contains data for the following domains flipkart.com, naya.ai, builtwith.com, amazon.com, spotify.com, miniclip.com, swym.it, bbc.com.

   To start the mock API server, run the following command

   `$ npm run mock:builtwith`

4) Start the main API server

   `$ npm run dev:server`

   This will start the API server at _localhost:5000_

5) Start the worker thread - These worker threads are responsible for completing all the core tasks like fetching data, updating data etc. They are distributed and can be instantiated as many times as needed to support the scale of the API.

   `$ npm run dev:worker`

### API Documentation 📰

---

> Note: Follow the steps above before clicking any links below

For Public API docs - Click [Here](http://localhost:5000/api/v1/docs)

For Admin API docs- Click [Here](http://localhost:5000/admin/v1/docs)

### How do I switch from mock to standard BuiltWith API endpoint

---

Open **commons/SourceModule/SourceModuleKeyMapping.ts** and replace _BuiltWithMock_ with _BuiltWith_
