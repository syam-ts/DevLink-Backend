import { User } from '../../../domain/entities/User';
import jwt from 'jsonwebtoken';

 

export class LogoutUser {
    constructor(res: any) { }

    async execute(res: any) {
       console.log('the cook', res.cookie)
       res.cookie("token", null)
       
       
      
    }
}