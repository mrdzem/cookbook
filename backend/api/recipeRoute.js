import express from "express"
import Recipe from "../models/recipe.js";
import {User} from "../models/user.js";

const router = express.Router();

router.get('/', async (req,res) => {
    const recipes = await Recipe.find().sort({date:-1})
    res.send(recipes)
})


router.get("/id/:id", async (req, res) => {
	const post = await Recipe.findOne({ _id: req.params.id })
	res.send(post)
})

router.get("/author/:authorID", async (req, res) => {
	const post = await Recipe.find({ authorID: req.params.authorID }).sort({date:-1})
	res.send(post)
})

router.get('/tag/:tag', async (req,res) => {
    const recipes = await Recipe.find({
        "tags.tagName": req.params.tag
    })
    res.send(recipes)
})

router.get("/saved/:userID", async (req, res) => {
    const user = await User.findOne({ _id: req.params.userID })
	const post = await Recipe.find({ _id: { $in: user.saved} }).sort({date:-1})
	res.send(post)
})

router.get("/followed/:userID", async (req, res) => {
    const user = await User.findOne({ _id: req.params.userID })
	const post = await Recipe.find({ authorID: { $in: user.followed} }).sort({date:-1})
	res.send(post)
})

router.get("/search", async (req, res) => {
    const filters = req.query;
    
    
    if(!filters.include && !filters.tag){
        const post = await Recipe.find(
            { 'ingrediantList.ingrediantName': { $nin: filters.exclude}}
        ).sort({date:-1})
        res.send(post)
    }else if (!filters.include && filters.tag){
        const post = await Recipe.find({$and: [
            { 'tags.tagName': { $all: filters.tag}},
            { 'ingrediantList.ingrediantName': { $nin: filters.exclude}}
        ]}).sort({date:-1})
        res.send(post)
    }else if(filters.include && !filters.tag){
        const post = await Recipe.find({$and: [
            { 'ingrediantList.ingrediantName': { $all: filters.include}},
            { 'ingrediantList.ingrediantName': { $nin: filters.exclude}}
        ]}).sort({date:-1})
        res.send(post)
    }else{
        const post = await Recipe.find({$and: [
            { 'ingrediantList.ingrediantName': { $all: filters.include}},
            { 'tags.tagName': { $all: filters.tag}},
            { 'ingrediantList.ingrediantName': { $nin: filters.exclude}}
        ]}).sort({date:-1})
        res.send(post)
    }
	
	
})

export default router