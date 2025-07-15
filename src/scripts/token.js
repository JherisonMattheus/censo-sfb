// eslint-disable-next-line @typescript-eslint/no-require-imports
const jwt = require("jsonwebtoken");

const SECRET = "37844a7649964dd649d4c9cccf954738ea67783a17e6e2f26284d19cb976575d";

function generateToken(payload, expiresIn = "7d") {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, SECRET, { expiresIn }, (err, token) => {
      if (err || !token) {
        reject(err || new Error("Erro ao gerar token"));
      } else {
        resolve(token);
      }
    });
  });
}

(async () => {
  try {
    const token = await generateToken({ id: 123, role: "ADMIN" });
    console.log("Token JWT gerado:", token);
  } catch (err) {
    console.error("Erro:", err);
  }
})();
