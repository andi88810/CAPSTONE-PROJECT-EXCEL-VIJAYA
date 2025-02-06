import User from "../models/userModel.js";
import jwt from 'jsonwebtoken';
import asyncHandler from "../middleware/asyncHandler.js";

// Function to sign a JWT token
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '90d',
    });
};

// Function to create and send the JWT token and response
const createSendResToken = (user, statusCode, res) => {
    const token = signToken(user._id);
    const isDev = process.env.NODE_ENV === 'development';

    // Setting up the cookie options
    const cookieOptions = {
        expires: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // Cookie expires in 6 days
        httpOnly: true,  // The cookie cannot be accessed by JavaScript in the browser
        secure: !isDev,  // Use secure cookies in production (when NODE_ENV is not 'development')
    };

    // Set the cookie with the JWT token
    res.cookie('jwt', token, cookieOptions);

    // Removing password from the response for security reasons
    user.password = undefined;

    // Sending back the response with the user data and token
    res.status(statusCode).json({
        status: 'success',
        token,
        data: user,
        
    });
};

// Register a new user
export const registerUser = asyncHandler(async (req, res) => {
    // Check if this is the first user
    const isOwner = (await User.countDocuments({})) === 0;

    // Set role based on whether the user is the first one
    const role = isOwner ? 'owner' : 'user';

    // Create a new user
    const createdUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: role,
    });

    // Send token and user data in response
    createSendResToken(createdUser, 201, res);
});

export const loginUser = asyncHandler(async (req, res) => {
    // Validate email and password are provided
    if (!req.body.email || !req.body.password) {
        res.status(400);
        throw new Error("Email and password tidak boleh kosong.");
    }
// tahap 2 check apakah email ada di db atau ndak 
    const userData = await User.findOne({
        email: req.body.email
    })

    //tahap 3 
    if(userData &&(await userData.comparePassword(req.body.password))){
        createSendResToken(userData, 200, res)
    }else{
        res.status(400)
        throw new Error("Invalid User")
    }
});

export const getCurrentUser = asyncHandler(async(req,res)=>{
    const user = await User.findById(req.user.id).select("-password")
    if(user){
        return res.status(200).json({
            user
        })
    }else{
        res.status(404);
        throw new Error("User Not Found")
    }
})

export const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(Date.now())
    });
    
    res.status(200).json({
        message: "Logout Berhasil"
    });
};