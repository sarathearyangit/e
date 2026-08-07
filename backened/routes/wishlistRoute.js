import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
    addToWishlist,
    removeFromWishlist,
    getWishlist
} from "../controllers/wishlistController.js";

const wishlistRouter = express.Router();

wishlistRouter.post("/add", authMiddleware, addToWishlist);
wishlistRouter.post("/remove", authMiddleware, removeFromWishlist);
wishlistRouter.post("/get", authMiddleware, getWishlist);

export default wishlistRouter;