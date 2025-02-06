import express from 'express'
import { protectedMiddleware,adminMiddleware } from '../middleware/authMiddleware.js';
import {createProduct,allProduct,deleteProduct,detailProduct,updateProduct,Fileupload} from '../controllers/productController.js'

import { upload } from '../utils/uploadFileHandler.js'
const router = express.Router()

//crud produk

// Create Data Produk
// method post /api/v1/produk
// Middleware owner onyl
router.post('/',protectedMiddleware, adminMiddleware, createProduct)

// Read Data Produk
// method get /api/v1/produk
router.get('/', allProduct)

// Detail Data Produk
// method get /api/v1/produk/:id
router.get('/:id', detailProduct)

// Update Data Produk
// method put /api/v1/produk
router.put('/:id',protectedMiddleware,adminMiddleware, updateProduct)

// Delete Data Produk
// method post /api/v1/produk
router.delete('/:id',protectedMiddleware,adminMiddleware,deleteProduct)

router.post('/file-upload', protectedMiddleware, adminMiddleware, upload.single('image'), Fileupload)




export default router