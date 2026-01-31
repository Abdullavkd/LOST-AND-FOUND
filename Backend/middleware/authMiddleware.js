import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) {
            return res.status(401).json("Not Authorized, no token");
        }
        console.log(token)
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("hello")
        req.user = decoded;
        next()
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Something Went Wrong")
    }
}