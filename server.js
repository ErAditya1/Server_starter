import express from "express";
import cors from "cors";
import cron from "node-cron";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: "*",
  })
);


//  create a method to send a request to another server with the help of axios and node cron on every minuteconst axios = require("axios");
// const cron = require("node-cron");

const baseURI = process.env.SERVER_URI ;
console.log(process.env.SERVER_URI);
cron.schedule("* * * * *", () => {
try {
      axios
        .get(`${baseURI}/api/v1/welcome`)
        .then((response) => {
          console.log("Response received from 8000:", response.data);
        })
        .catch((error) => {
          console.error("Error sending data to another server:", error);
        });
} catch (error) {
    
}
});

app.get("/api/v1/welcome", (req, res) => {
  console.log("request received");
  try {
    axios
      .get(`${baseURI}/api/v1/welcome`)
      .then((response) => {
        res.json(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from another server:", error);
        res.status(500).json({ error: "Failed to fetch data" });
      });
  } catch (error) {
    console.error("Error occurred while processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
