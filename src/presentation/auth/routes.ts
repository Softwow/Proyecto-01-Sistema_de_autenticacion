
import {Router} from 'express'
import {authGoogleController} from './controller'
import { AuthService } from '../services/auth.service';


export  class  AuthRoutes {

    
    static  get routes(): Router {
     
      const  constroller= new authGoogleController()
       
      const  router= Router()
        router.post('/google',constroller.registerUserGoogle)
     
        return router
    }

}