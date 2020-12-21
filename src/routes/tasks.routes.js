import { Router } from 'express'

const router = Router();

//Swagger
const swaggerDoc = require('swagger-jsdoc');
const options = {
    swaggerDefinition: {
        info: {
            title: "Todo API",
            description: "ApiRest With Integrated MongoDB Database",
            contact: {
                name: "Gaspar Varela",
                name2: "Nicolas Marsh"
            },
            servers: ["http://localhost:3000"]
        }
    },
    apis: ["./src/routes/tasks.routes.js"]
}
export {options};

/**
 * @swagger
 * /tasks:
 *  get:
 *      description: Trae todas las tareas cargadas en la base de datos
 *      responses:
 *          '200':
 *              description: Las tareas fueron consultadas correctamente
 *  post:
 *      description: Se utiliza para cargar una entrada a la base de datos MongoDB
 *      parameters:
 *        - in: body
 *          name: task
 *          description: Tarea para agregar
 *          schema:
 *              type: object
 *              required:
 *                 - name
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  url:
 *                      type: string
 * /tasks/{id}:
 *  get:
 *      description: Trae una tarea especifica de la base de datos con su respectivo id
 *      parameters:
 *        - name: id
 *          in: path
 *          requiered: true
 *          type: string
 *      responses:
 *          '200':
 *              description: La tarea se mostro correctamente.
 *          '404':
 *              description: No se encontro la tarea.
 *  delete:
 *      description: Borra una tarea con su respectivo id
 *      parameters:
 *        - name: id
 *          in: path
 *          requiered: true
 *          type: string
 *      responses:
 *          '200':
 *              description: La tarea se borro correctamente.
 *          '404':
 *              description: No se encontro la tarea.
 *  put:
 *      description: Modifica una tarea con su respectivo id
 *      parameters:
 *        - name: id
 *          in: path
 *          requiered: true
 *          type: string
 *        - in: body
 *          name: task
 *          description: Tarea para agregar
 *          schema:
 *              type: object
 *              required:
 *                 - name
 *              properties:
 *                  name:
 *                      type: string
 *                  description:
 *                      type: string
 *                  url:
 *                      type: string
 *      responses:
 *          '200':
 *              description: La tarea se modifico correctamente.
 *          '404':
 *              description: No se encontro la tarea.
 */

//Database connection
import {connect} from '../database'
import { ObjectID } from 'mongodb'

router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('tasks').find({}).toArray();
    res.json(result);
});

router.post('/', async (req, res) => {
    const db = await connect();
    const task = {
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    };
    const result = await db.collection('tasks').insertOne(task);
    res.json(result.ops[0]);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('tasks').findOne( {_id: ObjectID(id) });
    res.json(result);
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('tasks').deleteOne( {_id: ObjectID(id) });
    res.json({
        message: `Tarea ${id} deleted`,
        result
    });
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updateTask = {
        name: req.body.name,
        description: req.body.description,
        url: req.body.url
    };
    const db = await connect();
    const result = await db.collection('tasks').updateOne( {_id: ObjectID(id) }, {$set: updateTask});
    res.json({
        message: `Tarea ${id} actualizada`,
    });
});

export default router;