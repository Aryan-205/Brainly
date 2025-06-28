import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"; 

const JWT_SECRET_KEY = 'AABA-DABBA-JABBA';

export const userMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers["authorization"];
    
    const decoded = jwt.verify(header as string, JWT_SECRET_KEY);

    if (decoded) {
        // @ts-ignore
        req.userId = decoded.id; 
        next(); 
    } else {
        res.status(401).json({ message: "Unauthorized User" });
    }
};