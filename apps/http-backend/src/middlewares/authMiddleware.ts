import { NextFunction , Response , Request } from "express";
import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/utils/constant"
interface AuthRequest extends Request {
  
    userId?: string;
}
export function authMiddleware(req: AuthRequest, res: Response, next : NextFunction){
try {
    const token = req.cookies?.accessToken
    if(!token){
     return res.json({"message" : "Authorized"})
    }
    const decoded = jwt.verify(
        token,
     JWT_SECRET
    ) as { userId: string };
    req.userId = decoded.userId;
    next();
}catch(error) {
    return res.status(401).json({ message: "Invalid token" });
}
}