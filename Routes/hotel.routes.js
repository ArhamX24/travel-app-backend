import express, { json } from "express";
import {getHotels, getSingleHotel, getHotelsBySearch} from "../Controllers/hotel.controllers.js"
import { getCategories } from "../Controllers/category.controllers.js";

import hotels from "../Data/hotels.js";
import Hotels from "../Model/hotels.model.js";

const HotelRouter = express.Router();

HotelRouter.get("/",getHotels)
.get("/categories", getCategories)
.get("/:id", getSingleHotel)
.get("/search/:city", getHotelsBySearch)
.post("/push", async(req,res) => {
  try {
    let dataInDb = await Hotels.insertMany(hotels.data);
    res.json(dataInDb)
  } catch (error) {
    console.log(error.message);
  }
}
)


export default HotelRouter



