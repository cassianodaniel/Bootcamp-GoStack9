import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/auth'; //token

class SessionController{
    async store(req,res){
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email }});

        if(!user){
            return res.status(401).json({ error: 'User e-mail not found.'});
        }

        if(!(await user.checkPassword(password))){
            return res.status(401).json({ error: 'Password doesnt match'});
        }

        const { id, name } = user;

        return res.json({
            user: {
                id,
                name,
                email,
            },
            token: jwt.sign({ id }, '3700f097e741a7702f7e4ac61ed88c1a', { expiresIn: '7d'}), //segundo parâmetro é um texto de segurança string
        })
    }
}

export default new SessionController();