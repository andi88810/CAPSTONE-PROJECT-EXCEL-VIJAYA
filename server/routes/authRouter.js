import express from 'express'
import { registerUser, loginUser, getCurrentUser, logoutUser} from '../controllers/authController.js'; // Ensure the path is correct
import { protectedMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router()

// post /api/v1/auth/register

router.post('/register', registerUser)

router.post('/login', loginUser)



//Get /api/v1/auth/Logout
router.get('/logout',protectedMiddleware, logoutUser)

//Get /api/v1/auth/getUser
router.get('/getuser', protectedMiddleware, getCurrentUser)

export default router