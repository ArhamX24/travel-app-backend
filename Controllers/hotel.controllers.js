import Hotels from "../Model/hotels.model.js";

const getHotels = async (req,res) => {
    let hotelCategory = req?.query?.category
    try {
      let hotelsData
      if(hotelCategory){
          hotelsData = await Hotels.find({category: hotelCategory})
      }else{
          hotelsData = await Hotels.find({});
      }
        if(hotelsData){
          return res.json(hotelsData);
        }else{
          return res.json({message: "No hotels data found"});
        }
    } catch (error) {
      console.log(error.message);
    }
}

const getSingleHotel = async (req,res) => {
  let {id} = req?.params
  try {
      let hotelInDb = await Hotels.findById(id)
      res.status(201).json(hotelInDb)
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

const getHotelsBySearch = async (req,res) => {
  let {city} = req?.params
  try{
    let hotelsData = await Hotels.find({city: city})
    res.status(201).json(hotelsData)
  }catch(err){
    req.status(500).json({message: err.message})
  }
}



export {getHotels,getSingleHotel,getHotelsBySearch}