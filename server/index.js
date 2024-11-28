const express = require("express");
const app = express();
// donenv config
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = express.Router();
const routes = require("./src/Routes/index");
const { origin_urls } = require("./src/config/uri");
const {ErrorMiddleware} = require("./src/middlewares/ErrorMiddleware");
const path = require("path");
const appsetting = require("./src/config/app")
const fs = require("fs");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "src", "utils", "mailer", "templates"));

app.use(
  cors({
    origin: origin_urls,
    credentials: true,
  })
);

// Serve static files from the 'src/uploads' directory
app.use('/src/uploads', express.static(path.join(__dirname, 'src', 'uploads')));

app.use(ErrorMiddleware);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);

router.use("/", routes);

router.get("/", async (req, res) => {
  try {
    res.send("Hello");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.use("*", (req, res) => {
  res.status(404).send("Not Found");
});




// Global error handler for uncaught exceptions
process.on("uncaughtException", (error) => {
  logErrorToFile(error);
  process.exit(1); 
});

// Global error handler for unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  logErrorToFile(reason);
  process.exit(1); 
});

// Function to log errors to a file
function logErrorToFile(error) {
  const errorLog = `${new Date().toISOString()} - ${error.stack || error}\n`;
  fs.appendFileSync("error.log", errorLog, "utf8");
}



app.listen(appsetting.port, () => {
  console.log(`app listening at http://localhost:${appsetting.port}`);
});