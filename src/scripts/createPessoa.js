const { PrismaClient } = require("../generated/prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {

  const pessoa = await prisma.pessoa.create({
    data: {
      name: "victor",
      CPF: "00000000023",
      email: "mattheus@gmail.com",
      idade: 20,
      nomeDoColetador: "mattheus",
      coletadoPorId: 2,
    },
  });

  console.log("Pessoa registrada:", pessoa);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });