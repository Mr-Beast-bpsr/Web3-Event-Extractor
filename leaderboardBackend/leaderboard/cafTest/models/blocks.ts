'use strict';
import {
  Model
}  from 'sequelize';
interface DataAttributes{

Previous:number;
current:number;

}
module.exports = (sequelize:any, DataTypes:any) => {
  class  datas extends Model<DataAttributes>
  implements DataAttributes {
    
    Previous!:number;
    current!:number;
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  datas.init({
   
    Previous:{type:DataTypes.DOUBLE},
    current:{type:DataTypes.INTEGER}
 
  }, {
    sequelize,
    modelName: 'Blocks',
  });
  return  datas;
};
