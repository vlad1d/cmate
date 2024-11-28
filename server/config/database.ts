import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database', 'vlad', '', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;