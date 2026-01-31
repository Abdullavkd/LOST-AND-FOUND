import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if(!token) {
            return res.status(401).json("Not Authorized, no token");
        }
        
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        
        req.user = decoded;
        next()
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Something Went Wrong")
    }
}