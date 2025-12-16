import { JWT_SECRET } from "@repo/utils/constant"
import jwt from "jsonwebtoken"


export  function generateJwt(userId : string){
  try {
      if (userId === undefined || null) {
          console.log("The user id is null while generating the jwt")
          return
      }

      const jwtToken =  jwt.sign({userId } , JWT_SECRET , {expiresIn : "15m"})
      return jwtToken
  }catch(error) {
      console.log("The error coming from utils/jwtGenerator is " , error)
  }

}