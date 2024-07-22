import { Config, defineConfig } from 'drizzle-kit';

interface DbCredentials {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
  }
  
  interface DrizzleConfig {
    schema: string;
    out: string;
    dialect: string;
    dbCredentials: DbCredentials;
    verbose: boolean;
    strict: boolean;
  }
  
  const drizzleConfig: DrizzleConfig = {
    schema: './drizzle/schema.ts',
    out: './drizzle',
    dialect: 'mysql',
    dbCredentials: {
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
    },
    verbose: true,
    strict: true,
  };
  
  export default drizzleConfig;