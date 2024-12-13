import Categories from "../Model/category.model.js";

const getCategories = async (req,res) => {
    try {
        let categoryData = await Categories.find({})
        res.json(categoryData)
    } catch (error) {
        console.log(error.message)
    }
}

export {getCategories}