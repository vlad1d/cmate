import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Shape extends Model {
}

Shape.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    x: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    y: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    z: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Shape',
});

export async function associateModels() {
    const { User } = await import('./User');
    Shape.belongsTo(User, { foreignKey: 'userId' });
}