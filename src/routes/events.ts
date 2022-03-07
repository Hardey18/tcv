import express from 'express';
import { Events, validateEvents } from '../models/events'

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const events = await Events.find();
        if (events) {
            res.send({
                data: events
            })
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

export default router;