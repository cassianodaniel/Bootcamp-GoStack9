import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth'; 

export default async (req,res,next) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({ error: 'Token not sent'});
    }
    const [bearer, token] = authHeader.split(' ');
        const decoded = await promisify(jwt.verify)(token, authConfig.secret, function(err,decoded){
            if(err){
                return res.status(401).json({ error: 'Invalid token'});
            }
        });
        
        req.userId = decoded.id;
        console.log("User Id: " + decoded.id)

        return next();
};