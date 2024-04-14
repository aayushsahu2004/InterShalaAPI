const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErroHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendToken");

exports.homepage = catchAsyncError(async function (req, res, next) {
    res.json({ message: "Secure HomePage" });
});

exports.currentuser = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findById(req.id).exec();
    res.json({ student });
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


exports.studentsendmail = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findOne({ email: req.body.email }).exec();

    if (!student) {
        return next(new ErroHandler("Student not found with this email address", 404));
    };

    const url = `${req.protocol}://${req.get("host")}/student/forget-password-link/${student._id}`

    sendmail(req, res, next, url);
    student.restePasswordToken = "1";
    await student.save();

    res.json({ student, url });
});

exports.studentforgetlink = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findById(req.params.id).exec();

    if (!student) {
        return next(new ErroHandler("Student not found with this email address", 404));
    };

    if (student.restePasswordToken === "1") {
        student.restePasswordToken = "0";
        student.password = req.body.password;
        await student.save();
    } else {
        return next(new ErroHandler("Invaild Reset Password Link! Please try again", 500));
    }
    res.status(200).json({
        message: "Password has been successfully changed"
    });
});

exports.studentresetpassword = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findById(req.id).exec();
    student.password = req.body.password;
    await student.save();
    sendToken(student, 201, res);
});