import express, { json } from "express";
import {getHotels, getSingleHotel, getHotelsBySearch} from "../Controllers/hotel.controllers.js"
import { getCategories } from "../Controllers/category.controllers.js";


const HotelRouter = express.Router();

HotelRouter.get("/",getHotels)
.get("/categories", getCategories)
.get("/:id", getSingleHotel)
.get("/search/:city", getHotelsBySearch)


export default HotelRouter



