// Define a new type for the user without sensitive details

import { User } from "src/common/model.type"

export interface IUserRepository{


    createUser(data: any)

    findUserByAny(uniqueId: any): Promise<User>

    // updateUser(id: number, data: any): Promise<User>
}