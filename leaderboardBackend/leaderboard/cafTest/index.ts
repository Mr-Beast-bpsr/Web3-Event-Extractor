import express ,{ Request, Response, NextFunction} from 'express';

var cors:any = require('cors');

 import auth from './middleware/auth';

import userRoute from './routes/user.routes'
import memberRoute from './routes/member.routes'
import Cronjob from './controllers/common/cronjob'
// import {validationError} from './helpers/validator.controller';

var cron = require('node-cron');
const app=express();
app.options('*', cors());
const server = require('http').createServer(app);

const port =process.env.PORT||3000;
app.get("/", function (req,res) {
  res.send("Response from the GET request")
  });
import db from './models';

app.use(express.json());
app.use(express.static('resources'));

app.use('/images',express.static(__dirname+'/resources/static/assets/uploads'))
//  app.use('/api/v1',)
 app.use('/api/v1/auth',userRoute);
 app.use('/api/v1/member',auth,memberRoute);
 app.get("/api/v1/welcome", auth, (req, res) => {
  res.status(200).send("data get successfully ");
});

// app.use('/api/v1/nft',nftRoute);
// app.use(validationError);

app.use(function(req:Request, res:Response, next:NextFunction) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use((err:any, req:Request, res:Response, next:any) => {
    const status = err.status || 500;
    res.status(status).json({ error: { message: err } });
});


  
 db.sequelize.sync().then(()=>{
  server.listen(port,async()=>{
    console.log('App Started');
  
  cron.schedule('30 3 * * 1', async () => {
      console.log('running a task every monday ');
      await Cronjob.weeklyCron()
    });

    cron.schedule('30 4 1 * *', async () => {
      console.log('running a task every 1st of the Month');
      await Cronjob.monthlyCron()
    });
  
  
  })
 });


