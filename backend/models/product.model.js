import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: [true, "Image is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]

    },
    isFeatured: {
        type: Boolean,
        default: false
    }
},{timestamps: true})   //helps to automatically add createdAt and updatedAt fields

const Product = mongoose.model("Product", productSchema) //creating a model

export default Product