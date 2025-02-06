import express from 'express'
import { protectedMiddleware,adminMiddleware } from '../middleware/authMiddleware.js';
import { CreateOrder, AllOrder, DetailOrder, CurrentUserOrder, callbackPayment} from '../controllers/OrderController.js'

const router = express.Router()

// post/api/v1/order
// cuman di akses user auth 
router.post('/',protectedMiddleware, CreateOrder)

//get /api/v1/order cu,a bisa di akses user role owner
router.get('/',protectedMiddleware,adminMiddleware,AllOrder)

//get /api/v1/order/:id cuma bisa di akses user sama admin
router.get('/:id',protectedMiddleware,DetailOrder)

//get /api/v1/oder/current/user/
router.get('/current/user',protectedMiddleware, CurrentUserOrder,)


router.post('/callback/midtrans', callbackPayment) 



export default router