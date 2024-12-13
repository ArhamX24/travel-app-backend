import express from "express";
import {getHotels, getSingleHotel} from "../Controllers/hotel.controllers.js"
import { getCategories } from "../Controllers/category.controllers.js";

const HotelRouter = express.Router();

HotelRouter.get("/",getHotels)
.get("/categories", getCategories)
.get("/:id", getSingleHotel)


export default HotelRouter



