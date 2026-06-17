/**
 * Applies one or more .sql migration files to Postgres over a direct
 * connection (DDL — which the Data API can't do). Idempotent files only.
 *
 * Connection comes from env (never hardcode the password):
 *   PGHOST=db.<ref>.supabase.co PGPASSWORD=... node scripts/migrate.mjs supabase/migrations/0003_company_profile_geo.sql
 */
import { readFileSync } from 'node:fs';
import pg from 'pg';

const files = process.argv.slice(2);
if (!files.length) {
  console.error('usage: node scripts/migrate.mjs <file.sql> [more.sql ...]');
  process.exit(1);
}

const client = new pg.Client({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT || 5432),
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE || 'postgres',
  ssl: { rejectUnauthorized: false },
});

await client.connect();
try {
  for (const f of files) {
    const sql = readFileSync(f, 'utf8');
    await client.query(sql);
    console.log('applied:', f);
  }
} finally {
  await client.end();
}
