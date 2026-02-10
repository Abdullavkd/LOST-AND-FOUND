import userModel from "../Model/UserSchema.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import mongoose from "mongoose";

/**
 * Function for userRegistration
 * @param {*} req 
 * @param {*} res 
 */
export const userRegister = async (req, res) => {
    try {
        // take data from body
        const body = req.body;
        if(!body) {
            return res.status(404).json("There is no data on body")
        }
        
        const {name, email, password} = body;
        if(!name || !email || !password) {
            return res.status(404).json("name, email and password are compalsory")
        }

        //is user Exist
        const isExist = await userModel.findOne({email:email});
        if(isExist) {
            return res.status(404).json("User already exist")
        }

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // save user to database;
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })
        await newUser.save();

        // send response
        res.status(201).json({
            message: "Account Created Successfully",
            user: {
                name,
                email,
                password
            }
        })
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Server Error");
    }
}



/**
 * Function to login
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const userLogin = async (req, res) => {
    try {
        // take data from body
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(404).json("Email and Password are compalsory");
        }

        // check is account exists
        const user = await userModel.findOne({email:email});
        if(!user) {
            return res.status(404).json("User is not exist")
        }
        // check password
        const isMatchPass = await bcrypt.compare(password, user.password);
        if(!isMatchPass) {
            return res.status(404).json("Wrong Password");
        }

        // create JWT
        const token = jwt.sign(
            {id: user.id},
            process.env.SECRET_KEY
        );

        if(!token) {
            return res.status(404).json("Something Went Wrong");
        }

        res.status(200).json({message: "Login Successfull",
            user:{
                name: user.name,
                email: email,
                token: `Bearer ${token}`
            }
        })
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Something Went Wrong");
    }
}




export const userUpdate = async (req, res) => {
    try {
        const {id} = req.params;
        const {name, email, password} = req.body;
        if(!id) {
            return res.status(404).json("Id is not provided")
        }
        if(!name && !email && !password) {
            return res.status(404).json("no datas on body")
        }
        // check acces to do it
        const userId = req.user.id;
        if(!userId) {
            return res.status(404).json("There is no userId");
        }
        const user = await userModel.findById(id);
        if(id.toString() !== userId) {
            return res.status(404).json("You have no access to update it");
        }

        // hash updated password
        let hashedPass;
        if(password) {
            hashedPass = await bcrypt.hash(password, 10);
        }

        const updatedUser = await userModel.findByIdAndUpdate(id, {name, email, password: hashedPass}, {new: true, runValidators: true});
        if(!updatedUser) {
            return res.status(404).json("Something Went Wrong");
        }

        // give response
        res.status(200).json({message: "Updated Successfully", user: updatedUser})
    } catch (error) {
        res.status(error.status || 500).json(error.message || "something went wrong")
    }
}




export const userDelete = async (req, res) => {
    try {
        // take data from body and params
        const {id} = req.params;
        // check access to do it
        const userId = req.user.id;
        if(id.toString() !== userId) {
            return res.status(404).json("You have no access to delete it");
        }

        const deletedUser = await userModel.findByIdAndDelete(id);

        if(!deletedUser) {
            return res.status(404).json("user is not available with provided id")
        }

        res.status(200).json({message: "Deleted Successfully", deletedUser})
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Something Went Wrong")
    }
}







/**
 * Function to logout
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const userLogout = async (req, res) => {
    try {
        const {id} = req.params;

        const user = await userModel.findById(id);
        if(!user) {
            return res.status(403).json("You cannot Logout, Because you have no account here");
        }
        res.status(200).json("You Logged out Successfully")
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Server Error");
    }
}




export const user = async (req, res) => {
    try {
        const userId = req.user.id;
        res.status(200).json(userId)
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Server Erro")
    }
}