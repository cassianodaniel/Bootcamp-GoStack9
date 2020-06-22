import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize){
        super.init( //inicie esta classe como pai
        {
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,
        },
        {
            sequelize, //padrão 
        }
        );
        return this;
    }
}

export default User;