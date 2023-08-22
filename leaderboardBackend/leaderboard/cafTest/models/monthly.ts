'use strict';
import {
  Model
}  from 'sequelize';
interface MonthlyAttributes{
address:string;
amount:number;
rank:number;
bonus:number;
refer:number;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  Monthly extends Model<MonthlyAttributes>
  implements MonthlyAttributes {
    address!:string;
    amount!:number;
    rank!:number;
    bonus!:number;
    refer!:number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Monthly.init({
    address:{type:DataTypes.STRING,},
   amount:{type:DataTypes.DOUBLE},
   rank:{type:DataTypes.INTEGER},
   bonus:{type:DataTypes.DOUBLE},
   refer:{type:DataTypes.INTEGER}
  }, {
    sequelize,
    modelName: 'Monthlys',
  });
  return  Monthly;
};
