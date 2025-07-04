import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'mysql',
    schema: './src/db/schemas/*',
    out: 'src/db/migrations',
    dbCredentials: {
        url: String(process.env.DATABASE_URI)
    },
    migrations: {
        prefix: 'timestamp',
        table: '__drizzle_migrations__'
    },
    verbose: true
})