import mongoose from 'mongoose';

const { Schema } = mongoose;

const singleProductSchema = new Schema({
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: true
    },
});

const orderSchema = new Schema({
    total: {
        type: Number,
        required: [true, 'Total harga harus di isi']
    },
    itemsDetail: [singleProductSchema],
    user: {
        type: Schema.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'process', 'cancelled','success',"failed","cancel"],
        default: 'pending'
      },
      
    // status: {
    //     type: String,
    //     enum: ["pending", "unpaid", "paid", "cancelled","success","failed", "proccessing"],
    //     default: "unpaid"
    //   },
    firstName: {
        type: String,
        required: [true, "Nama Depan Harus di isi!"]
    },
    lastName: {
        type: String,
        required: [true, "Nama Belakang Harus di isi!"]
    },
    phone: {
        type: String,
        required: [true, "No Telpon Harus di isi!"]
    },
    email: {
        type: String,
        required: [true, "Email Harus di isi!"]
    },
    
    shippingAddress: {
        addressLine1: { type: String, required: [true, "Address Line 1 harus diisi!"] },
        addressLine2: { type: String },
        city: { type: String, required: [true, "City harus diisi!"] },
        state: { type: String, required: [true, "State harus diisi!"] },
        postalCode: { type: String, required: [true, "Postal Code harus diisi!"] },
        country: { type: String, required: [true, "Country harus diisi!"] },
    },
    
    
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
