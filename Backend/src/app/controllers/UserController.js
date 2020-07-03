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

    async update(req,res){
        const { email, oldPassword } = req.body;

        const user = await User.findByPk(req.userId);

        if(email !== user.email){
            const userExists = await User.findOne({ where: { email }});
            if (userExists){
                return res.status(400).json({ error: 'User e-mail already been registered' });
            }
        }

        if(oldPassword && !(await user.checkPassword(oldPassword))){
            return res.status(401).json({ error: 'Password does not match'});
        }

        const { id, name, provider } = await user.update(req.body);

        return res.json({
            id,
            name,
            email,
            provider,
        });
    }
}

export default new UserController();