const mongoose = require("mongoose");

const technicalquestionschmea = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "technical quesiton is required"],
    },
    intention: {
      type: String,
      required: [true, "intenion is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  {
    _id: false,
  },
);

const skillgapschema = new mongoose.Schema(
  {
    skill: {
      type: String,
      required: [true, "skills required"],
    },
    severity: {
      type: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "sevirity is required"],
      },
    },
  },
  {
    _id: false,
  },
);

const preparationschema = new mongoose.Schema({
  day: {
    type: Number,
    required: [true, "day is required"],
  },
  focus: {
    type: String,
    required: [true, "focus is requried"],
  },
  tasks: {
    type: String,
    required: [true, "task is required"],
  },
});

const behaviouralquestionschema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: [true, "behavioural quesiton is required"],
    },
    intention: {
      type: String,
      required: [true, "intenion is required"],
    },
    answer: {
      type: String,
      required: [true, "answer is required"],
    },
  },
  {
    _id: false,
  },
);

const interviewreportschema = new mongoose.Schema(
  {
    jobdescription: {
      type: String,
      required: [true, "job description is reuqired"],
    },
    resume: {
      type: String,
    },
    selfdescription: {
      type: String,
    },
    matchscore: {
      type: Number,
      min: 0,
      max: 100,
    },
    technicalquestion: [technicalquestionschmea],
    behaviouralquestion: [behaviouralquestionschema],
    skillspag: [skillgapschema],
    preparationplan: [preparationschema],
  },
  {
    timestamps: true,
  },
);

const interviewreportmodel = mongoose.model(
  "interveiwreport",
  interviewreportschema,
);

module.exports = interviewreportmodel;
