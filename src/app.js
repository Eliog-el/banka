const express = require("express");
const morgan = require('morgan')

const app = express();

app.use(morgan('tiny'))

app.get("", (req, res) => {
  res.json({Message:'Banka App'});
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
