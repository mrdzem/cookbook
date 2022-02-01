import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    authorID: {type: String, require: true},
    author: {type: String, require: true},
    recipeTitle: {type: String, require: true},
    recipeText: {type: String, require: true},
    recipeImage: {type: String, require: true},
    tags: [{tagName: {type: String}}],
    ingrediantList: [{
        ingrediantName: {type: String},
        unit: {type: String},
        amount: {type: Number}
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

const Recipe = mongoose.model("recipe",recipeSchema);

export default Recipe