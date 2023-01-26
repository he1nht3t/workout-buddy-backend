require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

//workout routes
const workoutRoutes = require("./routes/workoutRoutes");

//Express APP
const app = express();

//Enable CORS
app.use(cors());

//Middleware
app.use(express.json()); //to use req obj in express router (workout routes)

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//ROUTES
app.use("/api/workouts", workoutRoutes);

//CONNECT TO DB
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //Listen for request
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and listening on PORT: ", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
