import userModel from "../Model/UserSchema.js";

export const getUsersList = async (req, res) => {
    try {
        // take id from decoded token
        const userId = req.user.id;

        // find user in db
        const user = await userModel.findById(userId);
        if(!user) {
            res.status(404).json("No User Exist")
        }

        // check role of user
        if(user.role !== 'admin') {
            res.status(403).json("You cant enter to the page, You have no access for it")
        }

        const users = await userModel.find({}).select("-password");
        res.status(200).json(users)
        
    } catch (error) {
        res.status(error.status || "500").json(error.message || "Server Error");
    }
}
