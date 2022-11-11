const { getClient } = require("./get-client");

function getUser(req, response) {
  // headerkey username
  // sleeps
  // Hans'; SELECT CASE WHEN (1=1) THEN pg_sleep(2) ELSE pg_sleep(0) END-- 
  // sleeps
  // '; SELECT CASE WHEN (name='Hans') THEN pg_sleep(2) ELSE pg_sleep(0) END FROM users--
  // wont sleep
  // '; SELECT CASE WHEN (name='Hanni') THEN pg_sleep(2) ELSE pg_sleep(0) END FROM users--

  let username = req.header("username");
  let query = "SELECT * FROM users WHERE name LIKE '" + username + "';";
  console.log(query);

  getClient().then((client) => {
    client.query(query).then((entries) => {
      // some debug stuff
      console.log(
        `Database entries for ${username}: ${entries.rowCount} row(s)`
      );
      if (entries.rows > 0) {
        console.log(Object.keys(entries.rows?.[0]).join("\t"));
        console.log(
          `${entries.rows.map((r) => Object.values(r).join("\t")).join("\n")}`
        );
      }

      response.status(201);
      response.send();

      client.end();
    });
  });
}
module.exports = {
  getUser,
};
