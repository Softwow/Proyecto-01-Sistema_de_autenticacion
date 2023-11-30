
import {Router} from 'express'
import { AuthController } from './controller';
import { AuthService } from '../services/auth.service';


export  class  UsersRoutes {

    
    static  get routes(): Router {
     
      const  authService= new AuthService()
        const controller= new AuthController(authService)
      const  router= Router()
        router.post('/login',controller.loginUser)
        router.post('/register',controller.registerUser)
       
        return router
    }

}