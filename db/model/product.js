const mongoose = require('mongoose')


const productSchema = new mongoose.Schema(
    {
        pageNumber:{
            type:String,
            required:true
        },
        dataId:{
            type:String,
            required:true
        },
        name:{
            type:String,
            required:true
        },
        prix:{
            type:String,
            required:true
        },
        promotion:{
            type:String,
            required:true
        },
        url:{
            type:String,
            required:true
        }
    }
);


const Product = mongoose.model('Product', productSchema)



module.exports = Product;


