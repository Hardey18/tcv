// import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken';
// import config from 'config';

function auth (req: any, res: any, next: any) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, 'secret');
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send({
            error: ex
        })
    }
}

export default auth;