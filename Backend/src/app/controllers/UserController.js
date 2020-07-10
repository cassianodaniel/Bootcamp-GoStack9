import * as Yup from 'yup';
import User from '../models/User'

class UserController{
    async store(req,res){
        //validação do usuário na criação - requisições de variáveis - yup
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
            password: Yup.string().required().min(6),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Validation failure'});
        }

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
        //validação do usuário no update - requisições de variáveis - yup
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6), //6 digitos
            password: Yup.string().min(6).when('oldPassword', (oldPassword, field) => //when('x', (X, field) => X /*existe?*/ ? field.required() /*é obrigatorio*/)
                oldPassword ? field.required() : field //oldPassword existe? Se sim, faça com que a variável password (field) seja obrigatório, se não: retorne o field do jeito que estava
            ),
            confirmPassword: Yup.string().when('password', (password, field) =>
             password ? field.required().oneOf([Yup.ref('password')]) : field //compara a confirmPassword com a password
            ),
        });

        if(!(await schema.isValid(req.body))){
            return res.status(400).json({ error: 'Schema not valid/Validation failure'});
        }

        const { email, oldPassword } = req.body;

        
        const user = await User.findByPk(req.userId);

        if(email === user.email){
            const userExists = await User.findOne({ where: { email }});
            if (userExists){
                return res.status(400).json({ error: 'User e-mail already been registered' });
            }
        }

        if(!(oldPassword)){ //se não existir senha anterior
            return res.status(401).json({ error: 'Old Password has not been sent'});
        }
        
        /*
        //________________________________
        const password = Yup.object().shape({
            oldPassword: Yup.string().min(6), //6 digitos
            password: Yup.string().min(6),
            confirmPassword: Yup.string().when('password', (password, field) =>
             password ? field.required().oneOf([Yup.ref('password')]) : field //compara a confirmPassword com a password
            ),
        });

        if(password.confirmPassword){
            console.log('Yes!');
        }else{
            console.log('Fuck it');
        }
        //________________________________
        */

        if(!(await user.checkPassword(oldPassword))){
            return res.status(401).json({ error: 'Password does not match'});
        }

        console.log('Senha antiga depois do if:', oldPassword);
        console.log('Senha atual depois do if:', password);

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