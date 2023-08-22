import { Request, Response } from 'express';
import codeController from './service/code.controller';
import commonController from './common/common.controller';
import { sign, verify } from 'crypto';
// import userController from "../controllers/user.controller";
class UserController {
      
    async getWeeklyData(req: Request, res: Response) {
        try {
                 await codeController.getWeeklyData({
               
                }, res)
            
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }
    async getMonthlyData(req: Request, res: Response) {
        try {
                 await codeController.getMonthlyData({
               
                }, res)
            
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }
    async firstApi(req: Request, res: Response) {
        try {
            const{password}=req.body;
            console.log(req.body);
            
            let pass = process.env.apiPassword
            console.log(pass);

            if(pass != password){
               commonController.errorMessage("Please Check Password First",res)
            }else{            
                 await codeController.firstApi({
               
                }, res)
            }
        } catch (e) {
            console.log(e)
            commonController.errorMessage("user not register", res)
        }
    }

}


export default new UserController();