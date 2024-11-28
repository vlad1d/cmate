import { Sequelize } from 'sequelize';

// Simple database connection
const sequelize = new Sequelize('database', 'vlad', '', {
    host: 'localhost',
    dialect: 'postgres',
});

export default sequelize;