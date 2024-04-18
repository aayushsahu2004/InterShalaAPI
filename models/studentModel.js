const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const studentModel = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [4, "First name should be atleast 4 character long"],
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [4, "Last name should be atleast 4 character long"],
    },
    contact: {
        type: String,
        required: [true, "Contact is required"],
        maxLength: [10, "Contact must not exceed 10 character"],
        minLength: [10, "Contact  should be atleast character long"],
    },
    city: {
        type: String,
        required: [true, "City name is required"],
        minLength: [3, "City name should be atleast 3 character long"],
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        select: false,
        maxLength: [15, "Password should not exceed more than 15 characters"],
        minLength: [8, "Password should have at least 8 characters"],
        // match:[/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/]
    },
    restePasswordToken: {
        type: String,
        default: "0"
    },
    avatar: {
        type: Object,
        default: {
            fileId: "",
            url: "https://images.unsplash.com/photo-1633957897986-70e83293f3ff?q=80&w=1893&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
    },
    resume: {
        education: {
            type: Array,
            default: []
        },
        jobs: [],
        internship: [],
        responsebilities: [],
        courses: [],
        projects: [],
        skills: [],
        accomplishments: [],

    },
    appliedinternships: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "internship"
    }],
    appliedjobs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "job"
    }]
}, { timestamps: true });

studentModel.pre("save", function () {
    if (!this.isModified("password")) {
        return;
    }
    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

studentModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE });
}

module.exports = mongoose.model("student", studentModel);