import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        
        if(!token) {
            return res.status(401).json("Access Denied: No token provided");
        }
        
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if(err) {
                return res.status(401).json("Token Expired")
            }
            req.user = decoded;
            next()
        });
        
    } catch (error) {
        res.status(error.status || 500).json(error.message || "Internal Server Error")
    }
}