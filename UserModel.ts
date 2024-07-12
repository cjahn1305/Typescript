import { DataTypes, Model, Optional } from 'sequelize';
import todoSequelize from '../setup/database';

interface UserAttributes {
  id: number;
  email: string;
  name: string;
  password: string;
  profileImgUrl?: string; // optional
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'profileImgUrl'> {}

// Define the User model class extending Sequelize's Model class
class UserModel extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public password!: string;
  public profileImgUrl?: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

// Initialize the model
UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileImgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: todoSequelize,
    tableName: 'Users',
    defaultScope: { attributes: { exclude: ['password'] } },
    scopes: {
      allData: { attributes: { exclude: [] } },
    },
  }
);

export default UserModel;
