const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

//GET ALL WORKOUTS
const getWorkouts = async (req, res) => {
  const user_id = req.user._id;

  const workouts = await Workout.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(workouts);
};

//GET A WORKOUT
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such workout" });
  }

  const workout = await Workout.findById(id);

  workout
    ? res.status(200).json(workout)
    : res.status(404).json({ err: "No such workout!" });
};

//ADD A WORKOUT
const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  const emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ err: "Please fill in all the fields!", emptyFields });
  }

  try {
    const user_id = req.user._id;
    const workout = await Workout.create({ title, load, reps, user_id });
    res.status(201).json(workout);
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
};

//UPDATE A WORKOUT
const updateWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such workout" });
  }

  const workout = await Workout.findOneAndUpdate({ _id: id }, { ...req.body });

  workout
    ? res.status(201).json(workout)
    : res.status(404).json({ err: "No such workout!" });
};

//DELETE A WORKOUT
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ err: "No such workout" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });

  workout
    ? res.status(200).json(workout)
    : res.status(404).json({ err: "No such workout!" });
};

module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  updateWorkout,
  deleteWorkout,
};
