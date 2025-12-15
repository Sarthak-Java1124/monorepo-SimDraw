import jwt from "jsonwebtoken"


export  function generateJwt(userId : string){
  try {
      if (userId === undefined || null) {
          console.log("The user id is null while generating the jwt")
          return
      }

      const jwtToken =  jwt.sign({userId } , "secretOfJwt" , {expiresIn : "15m"})
      return jwtToken
  }catch(error) {
      console.log("The error coming from utils/jwtGenerator is " , error)
  }

}