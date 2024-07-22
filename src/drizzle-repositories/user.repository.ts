import { Inject, Injectable } from "@nestjs/common";
import { MySql2Database } from "drizzle-orm/mysql2";
import { DRIZZLE_CONNECTION } from "src/common/constants/drizzle.constant";
import { User } from "src/common/model.type";
import { IUserRepository } from "src/repository-interfaces/user.interface";
import * as schema from '../drizzle/schema';
import * as bcrypt from 'bcrypt';
import { eq } from "drizzle-orm";

@Injectable()
export class UserRepository implements IUserRepository {

    constructor(
        @Inject(DRIZZLE_CONNECTION) private readonly db: MySql2Database<typeof schema>,
      ) {}

    async createUser(data: any){

        const { email, firstname, lastname, password } = data;

        const hashedPassword = await bcrypt.hash(password, 10)

        const [createdUser] =  await this.db.insert(schema.User).values({
            fullname: firstname + ' ' + lastname,
            email: email,
            password: hashedPassword,
          })
    }


    async findUserByAny(uniqueId: any): Promise<User> {
        
        const [user] = await this.db.select().from(schema.User).where(eq(schema.User.id, uniqueId ));

        return user
    }
}