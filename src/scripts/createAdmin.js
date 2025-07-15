const { PrismaClient } = require("../generated/prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Lemos123", 10);

  const admin = await prisma.usuario.create({
    data: {
      name: "jherison",
      CPF: "61443681326",
      password: hashedPassword,
      role: "ADMIN",
    },
  });

  console.log("Admin criado:", admin);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });