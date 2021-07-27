import { Request, Response } from "express";

function corsMiddleware(req: Request, res: Response, next: any): any {
    console.log("Request");
    console.log(req.body);
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Content-Type")
    next();
}

export { corsMiddleware };