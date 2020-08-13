const mongoose = require('mongoose');

module.exports = function()
{
    mongoose.connect("mongodb://localhost/delhaize", { useUnifiedTopology: true, useNewUrlParser: true,useCreateIndex:true })
        .then(()=>console.log('Connect to mongodb'))
        .catch(err => console.log('Could not connect to mongdb',err));
        //mongoose.set('useCreateIndex', true)
}