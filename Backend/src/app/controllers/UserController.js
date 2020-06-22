import User from '../models/User'

class UserController{
    async store(req,res){
        const userExists = await User.findOne({ where: { email : req.body.email }});
        if (userExists){
            return res.status(400).json({ error: 'User e-mail already been registered' });
        }

        const { id, name, email, provider } = await User.create(req.body); //esta constante recebe {} da criação de User -> req.body (Imsomnia)

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }
}

export default new UserController();