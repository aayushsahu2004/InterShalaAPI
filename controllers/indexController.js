const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErroHandler = require("../utils/ErrorHandler");
const { sendToken } = require("../utils/sendToken");

exports.homepage = catchAsyncError(async function (req, res, next) {
    res.json({ message: "Secure HomePage" });
});

exports.currentuser = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findById(req.id).exec();
    res.json({student});
});

exports.studentsignup = catchAsyncError(async function (req, res, next) {
    const student = await new studentModel(req.body).save();
    sendToken(student, 201, res);
});

exports.studentsignin = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findOne({ email: req.body.email }).select("+password").exec();
    if (!student) {
        return next(new ErroHandler("Student not found with this email address", 404));
    };

    const isMatch = student.comparepassword(req.body.password);
    if (!isMatch) {
        return next(new ErroHandler("Wrong Credientials", 500));
    }
    sendToken(student, 200, res);
});

exports.studentsignout = catchAsyncError(async function (req, res, next) {
    res.clearCookie("token");
    res.json({ message: "Successfully Sign-Out" })
}); 