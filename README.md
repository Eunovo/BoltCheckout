# BoltCheckout
Accept instant payments from anywhere in the world.  
BoltCheckout is a web application that allows sellers to accept payments for their products over the bitcoin lightning network. It integrates with LND’s API to support lighning payments.

## Technologies
BoltCheckout was built with:

React.js
MUI
Node.js
Express.js
MongoDB

## Launch
To run BoltCheckout locally, follow these steps:

Clone this repository: `git clone https://github.com/Eunovo/BoltCheckout.git`  
Install dependencies: `yarn install`

### Server Environment Variables

**DATABASE_URL** Mongo URI for your database  
**LND_HOST**  URL to your REST LND Server  
**LND_MACAROON_PATH** Path to LND invoice macaroon  
**LND_CERT_PATH** Path to LND cert path  
**APP_PORT** Server port defaults to 2020
**JWT_SECRET** secret to encode user auth tokens

### Client Environment Variables

**REACT_APP_API_URL** URL to a running BoltCheckout server instance

### Running the application

Start the server: `cd server && yarn start`  
Start the client: `cd client && yarn start`

Open http://localhost:3000 in your browser

**Server LND Status**

`GET http://localhost:2020/` Will return the status of the LND Server.
```
lnd: "UNREACHABLE" // Indicates that the server could not reach LND
lnd: "SERVER_ACTIVE" // Indicates that the LND Server is active and ready to accept requests
// Anything else indicates that your BoltCheckout server can reach LND but the LND Server is not ready to accept requests
```


## License
BoltCheckout is licensed under the MIT License.