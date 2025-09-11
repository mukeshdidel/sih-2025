import { prisma } from ".";

async function main() {
  // Disable foreign key checks for truncation (Postgres syntax)
  await prisma.$executeRawUnsafe(`DO $$
  DECLARE
    _tbl text;
  BEGIN
    -- Disable triggers (including FK constraints)
    EXECUTE 'SET session_replication_role = replica';
    -- Truncate all tables except for migrations
    FOR _tbl IN
      SELECT tablename FROM pg_tables WHERE schemaname = 'public' AND tablename NOT IN ('_prisma_migrations')
    LOOP
      EXECUTE 'TRUNCATE TABLE "' || _tbl || '" RESTART IDENTITY CASCADE';
    END LOOP;
    -- Re-enable triggers
    EXECUTE 'SET session_replication_role = DEFAULT';
  END $$;`);

  console.log("All tables truncated.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });