import {Schema, model} from "mongoose"

const WishlistSchema = new Schema({
    hotelId: {type: String, required: true}
});

const Wishlist = model("WishlistItem", WishlistSchema)

export default Wishlist