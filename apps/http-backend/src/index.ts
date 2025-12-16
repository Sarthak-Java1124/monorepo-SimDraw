import express from "express"
import { prisma } from "@repo/db/client"
import bcrypt from "bcrypt"
import { generateJwt } from "./lib/utils/jwtGenerate.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./middlewares/authMiddleware.js";


const app = express()

const user = await prisma.user;
app.use(cookieParser());
app.use(express.json())


app.get("/", async (req, res) => {
    res.json({

        "message": "Hey There welcome to the http server "

    })
})

app.post("/signup", async (req, res) => {
    try {
        const { firstname, lastname, email, password } = req.body
        const isPresent = await user.findUnique({
            where: {
                email: email
            }
        })
        if (isPresent) {
            return res.json({
                "message": "User already exists"
            })
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const makeUser = await user.create({
                data: {
                    email,
                    firstName: firstname,
                    lastName: lastname,
                    password: hashedPassword

                }
            })
            const token = generateJwt(makeUser.id)
            res.cookie("accessToken", token, {
                secure: true,
                httpOnly: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000

            });
            return res.json({
                "message": "User registered Successfully"
            })
        }
    } catch (error) {
        console.log("The error in signing up is :", error);
        return res.status(500).json({
            message: "Internal server error",
        });

    }

})

app.post("/login", async (req, res) => {
    const { email, password } = req.body
    const isPresent = await user.findUnique({
        where: {
            email
        }
    })
    if (isPresent) {
        const checkPassword = await bcrypt.compare(password, isPresent.password)
        if (checkPassword) {
            const token = generateJwt(isPresent.id);
            res.cookie("accessToken", token, {
                secure: true,
                httpOnly: true,
                sameSite: "lax",
                maxAge: 15 * 60 * 1000

            });
            return res.json({ "message": "You are successfully logged in" })
        } else {
            return res.json({ "message": "Password is incorrect" })
        }
    } else {
        return res.json({ "message": "User not registered" })
    }
})
    app.post("/create-room" , authMiddleware , async(req , res)=>{
        
    })

app.listen(8089)