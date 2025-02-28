const express = require("express");
const bodyParser = require("body-parser");
const attendanceRoutes = require("./routes/attendanceRoutes");
require("dotenv").config();

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use("/api/attendance", attendanceRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
