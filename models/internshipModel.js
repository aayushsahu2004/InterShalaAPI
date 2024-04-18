const mongoose = require("mongoose");


const internshipModel = new mongoose.Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee"
    },
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "student"
    }],
    profile: {
        type: String,
        required: [true, "Intership Profile must be required"]
    },
    skills: {
        type: String,
        required: [true, "Skills must be required"]
    },
    internshiptype: {
        type: String,
        enum: ["In office", "Remote"],
        required: [true, "Intership Type must be required"]
    },
    openings: {
        type: Number,
        required: [true, "Number of openings are must be required"]
    },
    start: String,
    end: String,
    duration: String,
    responsibility: String,
    stipend: {
        stutas: {
            type: String,
            enum: ["Fixed", "Negotiable", "Performance Based", "Unpaid"]
        },
        amount: Number
    },
    perks: String,
    assesments: String

}, { timestamps: true });


module.exports = mongoose.model("internship", internshipModel);