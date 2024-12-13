import express from "express"
import {getWishlistItem, addWishlistItem, deleteWishlistItem} from "../Controllers/wishlist.controllers.js"
import auth from "../MiddleWares/auth.js";

let WishlistRouter = express.Router();

WishlistRouter.get("/",auth,getWishlistItem)
.post("/",auth, addWishlistItem)
.delete("/delete/:id",auth, deleteWishlistItem)

export default WishlistRouter