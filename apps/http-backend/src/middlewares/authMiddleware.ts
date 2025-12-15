import { NextFunction } from "express";
interface AuthRequest extends Request {
    userId?: string;
}
export function authMiddleware(res : Response , req : AuthRequest , next : NextFunction){

}