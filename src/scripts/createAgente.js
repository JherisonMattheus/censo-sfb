const { PrismaClient } = require("../generated/prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Lemos123", 10);

  const agente = await prisma.usuario.create({
    data: {
      name: "mattheus",
      CPF: "00000000000",
      email: "mattheus@gmail.com",
      password: hashedPassword,
      role: "AGENTE",
    },
  });

  console.log("Agente criado:", agente);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });