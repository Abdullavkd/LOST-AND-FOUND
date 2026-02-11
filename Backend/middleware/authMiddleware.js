import jwt from 'jsonwebtoken';

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;

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