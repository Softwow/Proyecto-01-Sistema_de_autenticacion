import { regularExps } from "../../../config/regular";

export class LoginuserDto{

    private constructor(
        public email: string,
        public password: string,
       
    ) {}

    static create(object:{[key:string]:any}): [string?, LoginuserDto?]{
        const {  email, password } = object;
       
        if (!email) return ['email is required',undefined];
        if (!regularExps.email.test(email)) return ['email is invalid',undefined];
        if (!password) return ['password is required',undefined];
        return [undefined, new LoginuserDto(email,password)]
    }
}