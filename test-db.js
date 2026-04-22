const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function test() {
  try {
    const lead = await prisma.lead.create({
      data: {
        name: "Test Lead Locahost v3.2",
        email: "test@example.com",
        projectType: "Testing",
        industry: "Hardware",
        city: "Montevideo",
        rating: 4.5,
        leadSource: "manual-test"
      }
    });
    console.log("✅ Lead created successfully:", lead.id);
  } catch (e) {
    console.error("❌ DB Insert Failed:", e);
  } finally {
    await prisma.$disconnect();
  }
}

test();
