import { regularExps } from "../../../config/regular";

export class RegisteruserDto{

    private constructor(
        public name: string,
        public email: string,
        public password: string,
       
    ) {}

    static create(object:{[key:string]:any}): [string?, RegisteruserDto?]{
        const { name, email, password } = object;
        if (!name) return ['name is required',undefined];
        if (!email) return ['email is required',undefined];
        if (!regularExps.email.test(email)) return ['email is invalid',undefined];
        if (!password) return ['password is required',undefined];
        return [undefined, new RegisteruserDto(name,email,password)]
    }
}