const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "sistema",
  password: "123456",
  port: 5432,
});

client.connect()
  .then(() => console.log("Conectado ao PostgreSQL 🚀"))
  .catch(err => console.error("Erro na conexão", err));

module.exports = client;
