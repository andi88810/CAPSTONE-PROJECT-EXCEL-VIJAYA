import mongoose from 'mongoose';


const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
    type: String,
    required: [true, "Name Produk Harus diisi"],
    unique: [true,"Product Sudah ada Gunakan silahkan buat yg lain"]
  },
  price: {
    type: Number,
    required: [true, "Harga Produk harus diisi"],
  },
  description: {
    type: String,
    required: [true, "Deskripsi Produk harus diisi"],
  },
  image: {
    type: String,
    default: "null"
  },
  category:{
    type: String,
    required: [true, "Kategori Produk Harus diisi"],
    emum:["Buku","Pensil","Pulpen","Map"]
  },
  stock:{
    type: Number,
    default: 0,
  }
});


const Product = mongoose.model("Product", productSchema)

export default Product