import {Schema, model} from "mongoose"

const CategorySchema = new Schema({
    category: {type: String}
});

const Categories = model("Category", CategorySchema);

export default Categories