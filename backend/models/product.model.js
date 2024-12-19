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
},{timestamps: true})

const Product = mongoose.model("Product", productSchema)

export default Product