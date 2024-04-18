const express = require("express");
const path = require("path");
const db = require("./ocnfig/connection");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: ture }));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
}

app.use(routes);

db.once("oepn", () => {
  app.listen(PORT, () => console.log(` Now listening on localhost:${PORT}`));
});
