import { Router } from "express";
import { 
    loginUser, 
    logoutUser, 
    registerUser, 
    changeCurrentPassword,  
    updateAccountDetails,
    getCurrentUser,
    getAllUsers
} from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";


const router = Router()

router.route("/register").post(
    registerUser
)
router.route("/login").post(loginUser)

//secured routes
router.route("/me").get(verifyJWT, getCurrentUser);
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)

// Admin only routes
router.route("/all-users").get(verifyJWT, getAllUsers)

export default router