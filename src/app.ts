// import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import router from './routes';
import globalErrorHandler from './middlewares/globalErrorHandler';
import notFound from './middlewares/notFound';
// import { MessageRoute } from './sockets/message.route';
// import { NotificationsRoute } from './modules/notification/notification.route';


const app: Application = express();
const allowedOrigins = [
  'http://localhost:5173',
  "https://project-management-system-softvence.vercel.app"

];

app.use(
  cors({
    origin: ["https://project-management-system-softvence.vercel.app", 'http://localhost:5173'],
    // function (origin, callback) {
    //   if (!origin || allowedOrigins.includes(origin)) {
    //     callback(null, true);
    //   } else {
    //     callback(new Error('Not allowed by CORS'));
    //   }
    // },
    credentials: true,
    allowedHeaders: [
      'Content-Type', "Authorization" 
    ]
  }),
);


//parsers(middlewares)
app.use(express.json());

//application routes

app.use('/api', router);
// router.use('/notifications', NotificationsRoute);
const test = async (req: Request, res: Response) => {
  res.send('Team project management server is running..!');
};

app.get('/', test);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
