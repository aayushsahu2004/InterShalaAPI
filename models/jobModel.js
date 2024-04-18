const mongoose = require("mongoose");


const jobModel = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee  "
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
    }],
    title: {
        type: String,
        required: [true, "Job title must be required"]
    },
    skills: {
        type: String,
        required: [true, "Skills must be required"]
    },
    jobtype: {
        type: String,
        enum: ["In office", "Remote"],
        required: [true, "Job type must be required"]
    },
    openings: {
        type: Number,
        required: [true, "Number of openings are must be required"]
    },
    discription: {
        type: String,
        required: [true, "Job discription must be required"]
    },
    preferences: {
        type: String,
        required: [true, "Job preferences must be required"]
    },
    salary: String,
    perks: String,
    assesments: String
}, { timestamps: true });


module.exports = mongoose.model("job", jobModel);