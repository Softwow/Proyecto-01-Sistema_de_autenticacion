import  jwt from 'jsonwebtoken'
import { envs } from './envs'

const JwtKey = envs.JWT_SECRET

export class jwtAdapter{
  
  static generateToken(payload: any,duration:string="2h"){
    return new Promise((resolve)=>{
      jwt.sign(payload,JwtKey,{expiresIn:duration},(err,token)=>{
        if(err)  return resolve(null)
        resolve (token)
        
      })
    })


  }
 
    /**
     * Validates a JWT token and returns the decoded payload.
     * @param token - The JWT token to be validated.
     * @returns A Promise that resolves to the decoded payload if the token is valid, or null otherwise.
     */
    static validationToken<T>(token: string):Promise<T| null>{
       
      return new Promise((resolve)=>{
        jwt.verify(token,JwtKey,(err,decoded)=>{
          if(err) return resolve(null)
          resolve(decoded as T)
        })
      })
    }



}