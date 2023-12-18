# node-restapi-express

I use Node js, Express js and MongoDB to make this project. 
#

```GET``` and ```POST``` both are two common HTTP requests used for building ```REST API's```. ```GET``` requests are used to send only limited amount 
of data because data is sent into header while POST requests are used to send large amount of data because data is sent in the body. 
Express.js facilitates you to handle ```GET``` and ```POST``` requests using the instance of express.

Also, ```PUT``` and ```DELETE``` are the http request used that can edit and delete the request data respectively.
#
## Running Locally

#### Make sure you have Node.js
    git clone https://github.com/devkishor8007/node-restapi-express.git
    create a .env then type MongoDB = yourMongoDBURlLink
    npm start

Your app should now be running on ```localhost:7000```
##
## Deploying to Heroku
#### Make sure you have Heroku Account
    heroku create anyname
    git push heroku master
    heroku open

## Some Terms - You should know

```REST``` stands for Representational State Transfer. REST has SSL and HTTPS for security. REST API uses Web Application Description Language for describing the functionalities being offered by web services

```API``` stands for Application Program Interface; a set of routines, protocols and tools for building software and applications.

```Node.js``` is a JavaScript runtime built on Chrome's V8 JavaScript engine.

```Express js``` is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.

```MongoDB``` is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas
#

### How to add 'node_modules' to .gitignore file?

    git rm -r --cached node_modules
    git commit -m 'Remove the now ignored directory node_modules'
    git push origin <branch-name>
