// objeto para  hash de la contraseña 

import { compareSync, genSaltSync, hashSync } from "bcryptjs";


export const bcryptAdapter = {

    hash: (password: string) => {
        const salt = genSaltSync();
        return hashSync(password, genSaltSync()

        )
    },
    compare: (password: string, hash: string) => compareSync(password, hash),
}

