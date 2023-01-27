const express = require("express");

//IMPORT AUTH
const requireAuth = require("../middleware/requireAuth");

//IMPORT WORKOUT CONTROLLERS
const {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout,
} = require("../controllers/workoutController");

//Express router
const router = express.Router();

//auth user for workout routes
router.use(requireAuth);

//get all workouts
router.get("/", getWorkouts);

//get a workout
router.get("/:id", getWorkout);

//add a workout
router.post("/", createWorkout);

//delete a workout
router.delete("/:id", deleteWorkout);

//update a workout
router.patch("/:id", updateWorkout);

module.exports = router;
