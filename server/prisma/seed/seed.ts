import { createSeedClient } from "@snaplet/seed";

async function main() {
  const seed = await createSeedClient();
  
  // Truncate all tables in the database
  await seed.$resetDatabase();
  
  // Seed the database with 10 users
  await seed.user((createMany) => createMany(20, {
    // Create 10 posts for each of those users
    posts: (createMany) => createMany(20),
  }))
  
  console.log("Database seeded successfully!");
  
  process.exit();
};

main();