'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: { //coluna
        type: Sequelize.INTEGER,
        allowNull: false, //não haverá users sem id
        autoIncrement: true,
        primaryKey: true,
      },
      name:{ //coluna
        type: Sequelize.STRING,
        allowNull: false //não haverá users sem nome

      },
      email:{ //coluna
        type: Sequelize.STRING,
        allowNull: false, //não haverá users sem nome
        unique: true, //só pode haver esta característica uma única vez no banco 
      },
      password_hash: { //criptografia de senhas
        type: Sequelize.STRING,
        allowNull: false,
      },
      provider: { //coluna prestador de serviço
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false,
      },//PRÓXIMAS DUAS COLUNAS SÃO PADRÃO
      created_at:{ //data de criação de registro
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{ //data de edição de registro
        type: Sequelize.DATE,
        allowNull: false,
      },
     });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.droptable('users');
  }
};
