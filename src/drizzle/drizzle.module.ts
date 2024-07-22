import { Global, Module } from "@nestjs/common";
import { createConnection } from "mysql2/promise";
import { DRIZZLE_CONNECTION } from "src/common/constants/drizzle.constant";
import drizzleConfig from "src/config/drizzle.config";
import { drizzle } from "drizzle-orm/mysql2";
import * as schema from './schema';



@Global()
@Module({
  providers: [
    {
      provide: DRIZZLE_CONNECTION,
      useFactory: async () => {
        const connection = await createConnection({
          host: 'localhost',
          port: 3307,
          user: 'papyrus',
          password: 'pass',
          database: 'test'
      });
        return  drizzle(connection, {schema, 
            mode: 'default'
        });
      },
    },
  ],
  exports: [DRIZZLE_CONNECTION],
})
export class DrizzleModule {}
