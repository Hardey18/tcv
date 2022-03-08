import express from 'express';
import auth from '../middleware/auth';
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

router.post('/', auth, async (req, res) => {
    try {
        const { error } = validateEvents(req.body); 
        if (error) return res.status(400).send(error.details[0].message);
    
        let event = new Events({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            isVirtual: req.body.isVirtual,
            date: req.body.date,
            address: req.body.address,
        });
        event = await event.save();
        
        res.send({
            event
        });
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const event = await Events.findById(req.params.id);
      
        res.send(event);
    } catch (error) {
        return res.status(400).send('The event with the given ID was not found.');
    }
});

export default router;