// import _ from 'lodash';
import { Admin } from '../models/admins';
import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const admin = await Admin.find();
        if (admin) {
            res.send({
                data: admin
            })
        }
    } catch (error) {
        return res.status(400).send(error.message);
    }
})

router.post('/', async (req: Request, res: Response) => {
    try {
        const admin = await Admin.findOne({ email: req.body.email })
        if (!admin) return res.status(400).send('Invalid credentials')
        
        // const validPassword = await bcrypt.compare(req.body.password, admin.password);
        if (req.body.password !== admin.password) return res.status(400).send('Password does not match')
        
        const token = admin.generateAuthToken()
        res.send(token);
    } catch (error) {
        return res.status(400).send(error.message);
    }
});

export default router;