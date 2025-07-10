import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';
import { DATABASE_URI as url } from './src/constants/dotenv'

export default defineConfig({
    dialect: 'mysql',
    schema: './src/db/schemas/*',
    out: 'src/db/migrations',
    dbCredentials: { url },
    migrations: {
        prefix: 'timestamp',
        table: '__migrations__'
    },

    verbose: true
})
