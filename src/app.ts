import express, {Application, Request, Response, NextFunction} from 'express';
//import bodyParser from 'body-parser';
//import logging from './config/logging';
import config from './config/config';
import productRoutes from './routes/product';
import mongoose from 'mongoose';


const router = express();

/** Log the request */
router.use((req, res, next) => {
    /** Log the req */
    //logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
    res.json({ message: "success" });

    res.on('finish', () => {
        /** Log the res */
       // logging.info(NAMESPACE, `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`);
       res.json({ message: "fail" });
    })
    
    next();
});
const port = 8080; 

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


/** Rules of our API */
router.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }

    next();
});

/** Routes go here */
router.use('/products', productRoutes);

/** Error handling */
router.use((req, res, next) => {
    const error = new Error('Not found');

    res.status(404).json({
        message: error.message
    });
});

// APIs
app.use("/api/product", [productRoutes]);
app.get('/', (req, res) =>{
  res.send('This is a test page')
});



app.listen(port, (): void => {
  console.log("Server is running");
});


/*
import express, {Application, Request, Response, NextFunction} from 'express';

import { productRouter } from './routes/product'
import { connect } from './schemas/index';

const port = 8080; 

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB
connect();

// APIs
app.use("/api/product", [productRouter]);
app.get('/', (req, res) =>{
  res.send('질럿질럿질럿')
});



app.listen(port, (): void => {
  console.log("Server is running");
});
*/
// 굳이 모든 타입을 명시해 줄 필요가 없다.
// 자동으로 사용되는 인자 값들, 바로 뒤에 값이 적용되는 경우는 바로 타입이 명시되기 때문이다.