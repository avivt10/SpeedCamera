const mongoose = require('mongoose')


const connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/Users').then(
        () => { console.log(" mongodb - connected") },
        err => { console.log("mongodb - failed to connect") }
      );;
}


module.exports = connect;
