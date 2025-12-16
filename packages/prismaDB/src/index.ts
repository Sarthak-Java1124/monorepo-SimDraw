import { PrismaClient } from "../generated/prisma/client";


export const prisma = new PrismaClient({
    accelerateUrl: process.env.DATABASE_URL!,
});
