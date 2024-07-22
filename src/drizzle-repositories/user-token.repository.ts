import { Inject, Injectable } from "@nestjs/common";
import { DRIZZLE_CONNECTION } from "src/common/constants/drizzle.constant";
import { UsertokensInterface } from "src/repository-interfaces/usertoken.interface";
import { drizzle, MySql2Database } from "drizzle-orm/mysql2";
import * as schema from '../drizzle/schema';
import { v4 as uuidv4 } from 'uuid';
import { UserAccessToken } from "src/common/model.type";
import { eq } from "drizzle-orm";


@Injectable()
export class UserAccessTokenRepository implements UsertokensInterface {

  constructor(
    @Inject(DRIZZLE_CONNECTION) private readonly db: MySql2Database<typeof schema>,
  ) {}

  async storeUserAccessToken(userId: number, accessToken: string) {
    const [createdToken] = await this.db.insert(schema.UserAccessToken).values({
      accessToken: accessToken,
      userId: userId,
    })

  }

  async revokeUserAccessToken(accessToken: string) {
    // const [revoked_token] = await this.db.update(schema.UserAccessToken).set({
    //   revoked: true,
    // }).where({ acc });

    // return revoked_token;
  }

  async findUserAccessToken(accessToken: string): Promise<UserAccessToken | null> {
    const [userToken] = await this.db.select().from(schema.UserAccessToken).where(eq(schema.UserAccessToken.accessToken, accessToken ));
    return userToken || null;
  }
}