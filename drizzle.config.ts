import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./shared/schema.ts", // Adjust the path to your schema file
  out: "./drizzle", // Output directory for migrations
  driver: "pg", // Use PostgreSQL as the database driver
  dbCredentials: {
    connectionString: process.env.DATABASE_URL || "postgresql://neondb_owner:npg_NHrzVP2wmh7R@ep-autumn-tree-a5g1p21u-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require",
  },
});
