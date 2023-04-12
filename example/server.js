const express = require("express");
const { spellbookForge } = require("../dist/index");

const app = express()
  .use(spellbookForge({
    gitHost: 'https://github.com'
  }))

const port = process.env.PORT || "8080";

app.listen(port, () => {
  console.log("Server running on port %PORT%".replace("%PORT%", port));
})
