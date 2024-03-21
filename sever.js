require("dotenv").config();

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const mongoose = require("mongoose");
const connectDB = require("./config/connectDB");

const tasks = require("./routes/routes");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

connectDB();

// app.set("view agine", "ejs");
app.use(express.json());
app.use(express.static("./public"));

// routes
app.use("/api/v1/tasks", tasks);
app.use(notFound);
app.use(errorHandlerMiddleware)

mongoose.connection.once("open", () => {
    console.log(`Connection Successes`);
    app.listen(PORT, (error) => {
        if (error) console.log(`Can't Listen to PORT ${process.env.PORT}`);
        else console.log(`Server Running on http://localhost:${process.env.PORT}`);
    });
});

mongoose.connection.on("error", (err) => {
    console.log(`Connection Error to Database \n ${err}`);
});
