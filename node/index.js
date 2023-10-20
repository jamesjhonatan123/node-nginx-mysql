const express = require("express");
const mysql = require("mysql");
const util = require("util");

const app = express();
const port = 3000;

const config = {
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);

const query = util.promisify(connection.query).bind(connection);

(async () => {
  try {
    const tables = await query("SHOW TABLES LIKE 'people'");
    if (tables.length === 0) {
      await query(
        `CREATE TABLE people(id INT primary key AUTO_INCREMENT, nome VARCHAR(50));`
      );
    }
  } catch (error) {
    console.error("Error setting up the table:", error);
  }
})();

app.get("/", async (req, res) => {
  try {
    const random = Math.floor(Math.random() * 100);
    await query(`INSERT INTO people(nome) VALUES ('Jonatas${random}')`);

    const people = await query("SELECT * FROM people");

    const peopleList = people
      .map((person) => `ID: ${person.id}, Nome: ${person.nome}`)
      .join("<br>");

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <h2>People:</h2>
      ${peopleList}
    `);
  } catch (error) {
    console.error("Error inserting data:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
