import userModel from "../Model/UserSchema.js";
import bcrypt from 'bcrypt';

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




export const userLogin = async (req, res) => {
    try {
        // take data from body
        const {email, password} = req.body;
        if(!email || !password) {
            return res.status(404).json("Email and Password are compalsory");
        }

        // check is account exists
        const user = await userModel.find({email:email});
        if(!user) {
            return res.status(404).json("User is not exist")
        }

        // check password
        const isMatchPass = await bcrypt.compare(user.password, password);
        if(!isMatchPass) {
            return res.status(404).json("Wrong Password");
        }

        // create JWT
        const 
    } catch (error) {
        
    }
}