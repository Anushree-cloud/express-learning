//initializing a simple middleware
const logger = (req, res, next) => {
    console.log("middleware initialized!");
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}`); // here, protocol is http, host is localhost, and originalUrl is the url we have hit in postman 
    next(); //for moving to the next middleware function
}

module.exports = logger;