const morgan = require ('morgan'); 
const express = require ('express');


const bookRouter = require ('./routes/libRoutes');
const userRouter = require ('./routes/userRoutes');

const app = express();


//middlewares
if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
};

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

//this is where we mount...
app.use('/api/v1/books', bookRouter);
app.use('/api/v1/users', userRouter);


module.exports = app;