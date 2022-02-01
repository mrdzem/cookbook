import { User, validate } from "../models/user.js";
import express from "express";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const router = express.Router()

//create user

router.post("/", async (req,res) => {
    try{
        const{ error }  = validate(req.body);
        if(error)
            return res.status(400).send({message: error.details[0].message});


        const userName = await User.findOne({userName: req.body.userName});
        if(userName)
            return res.status(410).send({message: "User with given User Name already exists!"});


        const user = await User.findOne({email: req.body.email});
        if(user)
            return res.status(409).send({message: "User with given email already exists!"});

        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        await new User({...req.body, password: hashPassword}).save();
        res.status(201).send({message: "User created successfully!"});

    }catch(error){
        res.status(500).send({message: "Internal server error 21"});
        
    }
});

//handle follow recipes

router.put("/addFollow", async (req,res) => {
    try{
        
        const {userId, token} = req.body
        const user = jwt.verify(token, process.env.JWTPRIVATEKEY);
        if(!user)
            return res.status(410).send({message: "Invalid user token"});
  
        await User.findOneAndUpdate(
            { _id: user._id }, 
            { $addToSet: { followed: userId ,}},
        );
        res.status(201).send({message: "Follow successful!"});

    }catch(error){
        res.status(500).send({message: "Internal server error 21"});
        
    }
})

router.put("/removeFollow", async (req,res) => {
    try{
        
        const {userId, token} = req.body
        const user = jwt.verify(token, process.env.JWTPRIVATEKEY);
        if(!user)
            return res.status(410).send({message: "Invalid user token"});

        await User.findOneAndUpdate(
            { _id: user._id }, 
            { $pull: { followed: userId ,} },
        );
        res.status(201).send({message: "Follow successful!"});

    }catch(error){
        res.status(500).send({message: "Internal server error 21"});
        
    }
})

router.post("/checkFollow", async (req,res) => {
    try{
        const {userId, token} = req.body
        const user = jwt.verify(token, process.env.JWTPRIVATEKEY);
        if(!user)
            return res.status(410).send({message: "Invalid user token"});

        const haveFound = await User.findOne(
            { _id: user._id,  followed: userId},
        );
        if(haveFound){
            res.status(201).send(true);
            
        }else{
            res.status(201).send(false);
        }
    }catch(error){
        res.status(500).send({message: "Internal server error 21"});
        
    }
})

//handle saved recipes

router.put("/addSaved", async (req,res) => {
    try{
        const {recipeID, token} = req.body
        const user = jwt.verify(token, process.env.JWTPRIVATEKEY);
        if(!user)
            return res.status(410).send({message: "Invalid user token"});

        await User.findOneAndUpdate(
            { _id: user._id }, 
            { $addToSet: { saved: recipeID ,}},
        );
        res.status(201).send({message: "Follow successful!"});

    }catch(error){
        res.status(500).send({message: "Internal server error 21"});
        
    }
})

router.put("/removeSaved", async (req,res) => {
    try{
        
        const {recipeID, token} = req.body
        const user = jwt.verify(token, process.env.JWTPRIVATEKEY);
        if(!user)
            return res.status(410).send({message: "Invalid user token"});

        await User.findOneAndUpdate(
            { _id: user._id }, 
            { $pull: { saved: recipeID ,} },
        );
        res.status(201).send({message: "Follow successful!"});

    }catch(error){
        res.status(500).send({message: "Internal server error 21"});
        
    }
})

router.post("/checkSaved", async (req,res) => {
    try{
        const {recipeID, token} = req.body
        const user = jwt.verify(token, process.env.JWTPRIVATEKEY);
        if(!user)
            return res.status(410).send({message: "Invalid user token"});

        const haveFound = await User.findOne(
            { _id: user._id,  saved: recipeID},
        );
        if(haveFound){
            res.status(201).send(true);
        }else{
            res.status(201).send(false);
        }
    }catch(error){
        res.status(500).send({message: "Internal server error 21"});
        
    }
})


export default router;