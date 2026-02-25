const express = require("express");
const cors = require("cors");
const usuarioRoutes = require("./routes/usuarioRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API de agendamento rodando 🚀");
});

app.use(usuarioRoutes);

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000 🚀");
});