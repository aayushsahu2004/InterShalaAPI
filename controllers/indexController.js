const path = require("path");
const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const internshipModel = require("../models/internshipModel");
const jobModel = require("../models/jobModel");
const ErroHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendToken");
const { log } = require("console");
const imagekit = require("../utils/imageKit").initImageKit();


exports.homepage = catchAsyncError(async function (req, res, next) {
    res.json({ message: "Secure HomePage" });
});

exports.currentstudent = catchAsyncError(async function (req, res, next) {
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

    const url = `${req.protocol}://${req.get("host")}/student/student/forget-password-link/${student._id}`

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

exports.studentupdate = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findByIdAndUpdate(req.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: " Student Details updated successfully",
    })
});

exports.studentuploadavtar = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findById(req.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = uuid4() + Date.now() + path.extname(file.name);

    if (student.avatar.fileId !== "") {
        await imagekit.deleteFile(student.avatar.fileId);
    };

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName
    });

    student.avatar = { fileId, url };
    await student.save();
    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
    })
});


// --------------- Apply Intership ---------------

exports.applyinternship = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findById(req.id).exec();
    const internship = await internshipModel.findById(req.params.internshipid).exec();
    if (!internship) {
        return next(new ErroHandler("Internship Not Found!", 404));
    }
    if (internship.students.indexOf(student._id) === -1) {
        student.appliedinternships.push(internship._id);
        internship.students.push(student._id);
        await student.save();
        await internship.save();
        res.status(201).json({
            success: true,
            internship
        });
    } else {
        return next(new ErroHandler("You are already apllied for this Internship", 500));
    }

});



// --------------- Apply Job ---------------

exports.applyjob = catchAsyncError(async function (req, res, next) {
    const student = await studentModel.findById(req.id).exec();
    const job = await jobModel.findById(req.params.jobid).exec();
    if (!job) {
        return next(new ErroHandler("Job Not Found!", 404));
    }
    if (job.students.indexOf(student._id) === -1) {
        student.appliedjobs.push(job._id);
        job.students.push(student._id);
        await student.save();
        await job.save();
        res.status(201).json({
            success: true,
            job
        });
    } else {
        return next(new ErroHandler("You are already apllied for this Job", 500));
    }

});