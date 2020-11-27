import { Router } from 'express'
const router = Router();

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