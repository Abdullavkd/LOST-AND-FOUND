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
            return res.status(400).json("User already exist")
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

        // create ACCESS_TOKEN (JWT)
        const accessToken = jwt.sign(
            {id: user.id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        );
        
        
        // create ACCESS_TOKEN (JWT)
        const refreshToken = jwt.sign(
            {id: user.id},
            process.env.REFRESH_TOKEN_SECRET,
            {expiresIn: '7d'}
        );

        // send access token to cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        })


        // send refresh token to cookies
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })

        if(!accessToken || !refreshToken) {
            return res.status(404).json("Something Went Wrong");
        }

        res.status(200).json({message: "Login Successfull",
            user:{
                name: user.name,
                email: email,
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
        const user = await userModel.findById(userId).select("-password");

        if(id.toString() !== userId && user.role !== "admin") {
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
        
        // clear access token
        res.clearCookie('accessToken',{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        })
        

        // clear refresh token
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/'
        })

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
        const user = await userModel.findById(req.user.id).select("-password");
        res.status(200).json(user)
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Server Error")
    }
}






/**
 * Function to Refresh Access Token
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
export const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if(!refreshToken) return res.status(403).json("No Refresh Token");

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if(err) return res.status(403).josn("Invalid Refresh Token")

        // create new access token
        const newAccessToken = jwt.sign(
            {id: decoded.id},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: '15m'}
        )

        // send new access token to a cookie
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true, 
            secure: false,
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000
        })

        res.status(200).json("Token Refreshed");
    });
}