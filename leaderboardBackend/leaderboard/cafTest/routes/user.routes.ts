import { verify } from 'crypto';
import express from 'express';

import userController from "../controllers/user.controller";

const router = express.Router();

router.post("/firstapi", userController.firstApi);
router.post("/getweeklydata", userController.getWeeklyData);
router.post("/getmonthlydata", userController.getMonthlyData);



export default router;

