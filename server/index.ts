import sequelize from './config/database';
import { User } from './models/User';
import { Shape, associateModels } from './models/Shape';

// Initialize the database connection and hardcode some users in the database
const init = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        
        associateModels();

        await User.create({name: 'Vlad', password: '1234'});
        await User.create({name: 'CreatorMate', password: 'Vlad'});
        console.log('Users created.');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

init();