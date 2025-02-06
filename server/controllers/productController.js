import asyncHandler from "../middleware/asyncHandler.js";
// import mongoose from 'mongoose';
import Product from "../models/productModels.js"
import {v2 as cloudinary} from "cloudinary"
import streamifier from 'streamifier'

// Register a new user
export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body)
  res.status(201).json({
   message:"Berhasil Tambah Produk",
   data: newProduct
  })
});

export const allProduct = asyncHandler(async (req, res) => {
  // Salin req.query
  const queryObj = { ...req.query };

  // Fungsi untuk mengabaikan field tertentu (page dan limit)
  const excludeField = ["page", "limit","name"];
  excludeField.forEach((element) => delete queryObj[element]);

  let query
  if(req.query.name){
    query = Product.find({
    name: {$regex: req.query.name, $options: 'i'}
    })
  } else {
     query = Product.find(queryObj);
  }


  // // Membuat query untuk produk berdasarkan queryObj
  // let query = Product.find(queryObj);

  
  // Fungsi pagination
  const page = parseInt(req.query.page) || 1; // Konversi string ke number
  const limit = parseInt(req.query.limit) || 12; // Batas data per halaman
  const skipData = (page - 1) * limit; // Menghitung data yang di-skip
  
  query = query.skip(skipData).limit(limit); // Terapkan pagination ke query

  // Jika page ada dalam query
  let countProduct = await Product.countDocuments(queryObj)
  if (req.query.page) {
    if (skipData >= countProduct) {
      res.status(400);
      throw new Error("Halaman ini tidak ada");
    }
  }

  // Eksekusi query dan ambil data
  const data = await query;
  const totalPage = Math.ceil(countProduct / limit);

  // Mengirim respons dengan status 200 dan data yang diambil
  return res.status(200).json({
    message: "Data berhasil diambil",
    data,
    pagination : {
      totalPage,
      page, 
      totalProduct : countProduct
    }
  });
});


 export const detailProduct = asyncHandler(async (req, res) => {
   const paramsId = req.params.id;
//  Altenatif
   // // Check if paramsId is a valid ObjectId
   // if (!mongoose.isValidObjectId(paramsId)) {
   //   return res.status(400).json({ message: "ID tidak valid" });
   // } 
   const productData = await Product.findById(paramsId);
   if (!productData) {
     return res.status(404).json({ message: "ID tidak ditemukan" });
   }
   return res.status(200).json({
     message: "Detail Product Berhasil Ditampilkan",
     data: productData      
   });
 });
 
 

 export const updateProduct = asyncHandler(async (req, res) => {
    const paramsId = req.params.id
    const updateProduct = await Product.findByIdAndUpdate(paramsId,
      req.body,{
         runValidaros: false,
         new: true
      }
    )
    return res.status(201).json({
      data: updateProduct
    })
 });

 export const deleteProduct = asyncHandler(async (req, res) => {
    const paramsId = req.params.id
    await Product.findByIdAndDelete(paramsId)

    return res.status(200).json({
      message: " Hapus Produk Berhasil"
    })
 });

 export const Fileupload = asyncHandler(async (req, res) => {
  const stream = cloudinary.uploader.upload_stream({
    folder: "uploads",
    allowed_formats: ['jpg','png']
  },
  function(err,result){
    if(err){
      console.log(err)
      return res.status(500).json({
        message: 'gagal upload gambar',
        error : err
      }
    )
    }
    res.json({message:"Gambar Berhasil di upload",
      url: result.secure_url
    })
  }
)
streamifier.createReadStream(req.file.buffer).pipe(stream)
});