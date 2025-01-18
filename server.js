import express, { urlencoded } from "express"
import dbConnect from "./Config/dbConfig.js";
import HotelRouter from "./Routes/hotel.routes.js";
import UserRouter from "./Routes/user.routes.js";
import WishlistRouter from "./Routes/wishlist.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

let server = express();
const PORT = 8080;

server.use(express.json())
server.use(urlencoded({extended:true}))
server.use(cookieParser());
server.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
server.use("/hotels",HotelRouter)
server.use("/users", UserRouter)
server.use("/wishlist", WishlistRouter)


dbConnect().then(()=>{
    server.listen(PORT);
    console.log("db Connected & server is running");
}).catch((err)=>{
    console.log(err.message);
})
