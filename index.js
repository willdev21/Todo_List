const express = require("express");
const app = express();
require("./startup/routes")(app);
require("./startup/db")();
require("./startup/logging")();

// for handling uncaught errors that
// take place outside the express framework

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));
