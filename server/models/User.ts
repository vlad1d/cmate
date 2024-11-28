import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import { Shape } from './Shape';

// Define a user model which has an id, a name and a password. Can easily add more features such as email, etc.
export class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize,
    modelName: 'User',
});