import Wishlist from "../Model/wishlist.model.js";

const addWishlistItem = async (req,res) => {
    const newWishlist = new Wishlist(req?.body);
    try {
        let savedWishlist = await newWishlist.save();
        res.status(200).json({result: true, message: "Item Added To Wishlist", data: savedWishlist});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const deleteWishlistItem = async (req,res) => {
    const {id} = req?.params;
    try {
        let deletedWishlist = await Wishlist.findByIdAndDelete(id);
        res.status(200).json({result: true, message: "Item Deleted From Wishlist"});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

const getWishlistItem = async (req,res) => {
    try {
        let wishlistItems = await Wishlist.find({});
        res.status(200).json({result: true, message: "Wishlist Items Found", data: wishlistItems});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

export {addWishlistItem, deleteWishlistItem, getWishlistItem}