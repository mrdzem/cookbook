import Recipe from "../models/recipe.js";
import jwt from 'jsonwebtoken';
import express from "express";
import FormData from 'form-data';
import fetch from 'node-fetch';


const router = express.Router()


const postDetails = async (image) => {
    const dataform = new FormData();
    dataform.append("file", image);
    dataform.append("upload_preset", "cookbook-imageBase");
    dataform.append("cloud_name", "dhydpjgpk");
    const ret = fetch("https://api.cloudinary.com/v1_1/dhydpjgpk/image/upload",{
      method: "post",
      body: dataform
    })
    .then(response => response.json())

    return ret;
  }



router.post("/", async (req,res) => {
    try{
        
        const {recipeTitle, recipeText, recipeImage} = req.body
        if(!recipeTitle || !recipeText || !recipeImage){
            return res.status(422).send({message: "Please fill all the fields"});
        }

        const user = jwt.verify(req.body.token, process.env.JWTPRIVATEKEY);
        if(!user)
            return res.status(410).send({message: "Invalid user token"});

        let response = await postDetails(recipeImage)
        await new Recipe({
            authorID: user._id, 
            author: user.userName,
            recipeTitle: req.body.recipeTitle,
            recipeText: req.body.recipeText,
            recipeImage: response.url,
            ingrediantList: req.body.ingrediantList,
            tags: req.body.tags
        }).save();

        res.status(201).send({message: "Recipe created successfully!"});

    }catch(error){
        
        res.status(500).send({message: "Internal server error 21"});
        
    }
});


router.put("/edit/:id", async (req,res) => {
    try{

        const {recipeTitle, recipeText, recipeImage ,prevImage} = req.body

        if(!recipeTitle || !recipeText ){
            return res.status(422).send({message: "Please fill all the fields"});
        }

        const user = jwt.verify(req.body.token, process.env.JWTPRIVATEKEY);
        if(!user)
            return res.status(410).send({message: "Invalid user token"});

        if(recipeImage){
            let response = await postDetails(recipeImage)
            const resp = await Recipe.updateOne({_id: req.params.id},{
                authorID: user._id, 
                author: user.userName,
                recipeTitle: req.body.recipeTitle,
                recipeText: req.body.recipeText,
                recipeImage: response.url,
                ingrediantList: req.body.ingrediantList,
                tags: req.body.tags
            });
        }else{
            const resp = await Recipe.updateOne({_id: req.params.id},{
                authorID: user._id, 
                author: user.userName,
                recipeTitle: req.body.recipeTitle,
                recipeText: req.body.recipeText,
                recipeImage: req.body.prevImage,
                ingrediantList: req.body.ingrediantList,
                tags: req.body.tags
        });
        }
        
        res.status(201).send({message: "Recipe edited successfully!"});

    }catch(error){
        
        res.status(500).send({message: "Internal server error 21"});
        
    }
});


router.delete("/delete/:id", async (req,res) => {
    try{
        

        const user = jwt.verify(req.query.token, process.env.JWTPRIVATEKEY);
        
        if(!user)
            return res.status(410).send({message: "Invalid user token"});
        
            
        const post = await Recipe.findOne({ _id: req.params.id })

        if(post.authorID != user._id){
            return res.status(411).send({message: "User does not match the recipe author"})
        }
        const resp = await Recipe.deleteOne({_id: req.params.id})
        res.status(201).send(resp);

    }catch(error){
        res.status(500).send({message: "Internal server error 21"});
    }
    
});

export default router;