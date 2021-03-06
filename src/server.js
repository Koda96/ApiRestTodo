import express, {json} from 'express'
import swaggerJSDoc from 'swagger-jsdoc';

const app = express();
const swaggerUI = require('swagger-ui-express');

//Routes
import IndexRoutes from './routes/index.routes'
import TaskRoutes from './routes/tasks.routes'
import {options} from './routes/tasks.routes'

// Settings
app.set('port', process.env.PORT || 3000); //Busca puerto predefinido, sino usa 3000
var swaggerSpec = swaggerJSDoc(options);

//Middlewares
app.use(json());

//Routes
app.use(IndexRoutes);
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use('/tasks', TaskRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

export default app;