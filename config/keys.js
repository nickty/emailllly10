//keys.js figure ou twhat set of credentila sto return 

if (process.env.NODE_ENV === 'production') {
    //we are in the production
    module.exports = require('./prod')

} else {
    //we are in the development
    module.exports = require('./dev')

}