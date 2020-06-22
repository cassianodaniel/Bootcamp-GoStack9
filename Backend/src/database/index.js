import Sequelize from 'sequelize';

import User from '../app/models/User';

import databaseConfig from '../config/database';

const models = [User]; //ARRAY COM O MODEL USER;

class Database{
    constructor(){
        this.init();
    }
    init(){
        this.connection = new Sequelize(databaseConfig);
        models.map(model => model.init(this.connection)) //Inicie este módulo connection   
    }
}

export default new Database();