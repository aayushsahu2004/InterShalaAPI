const path = require("path");
const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const employeeModel = require("../models/employeeModel");
const ErroHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendToken } = require("../utils/sendToken");
const imagekit = require("../utils/imageKit").initImageKit();
const { v4: uuid4 } = require("uuid");

exports.homepage = catchAsyncError(async function (req, res, next) {
    res.json({ message: "Secure Emplyoee HomePage" });
});

exports.currentEmployee = catchAsyncError(async function (req, res, next) {
    const employee = await employeeModel.findById(req.id).exec();
    res.json({ employee });
});

exports.employeesignup = catchAsyncError(async function (req, res, next) {
    const employee = await new employeeModel(req.body).save();
    sendToken(employee, 201, res);
});

exports.employeesignin = catchAsyncError(async function (req, res, next) {
    const employee = await employeeModel.findOne({ email: req.body.email }).select("+password").exec();
    if (!employee) {
        return next(new ErroHandler("Employee not found with this email address", 404));
    };

    const isMatch = employee.comparepassword(req.body.password);
    if (!isMatch) {
        return next(new ErroHandler("Wrong Credientials", 500));
    }
    sendToken(employee, 200, res);
});

exports.employeesignout = catchAsyncError(async function (req, res, next) {
    res.clearCookie("token");
    res.json({ message: "Successfully Sign-Out" })
});


exports.employeesendmail = catchAsyncError(async function (req, res, next) {
    const employee = await employeeModel.findOne({ email: req.body.email }).exec();

    if (!employee) {
        return next(new ErroHandler("Employee not found with this email address", 404));
    };

    const url = `${req.protocol}://${req.get("host")}/employee/employee/forget-password-link/${employee._id}`

    sendmail(req, res, next, url);
    employee.restePasswordToken = "1";
    await employee.save();

    res.json({ employee, url });
});

exports.employeeforgetlink = catchAsyncError(async function (req, res, next) {
    const employee = await employeeModel.findById(req.params.id).exec();

    if (!employee) {
        return next(new ErroHandler("Employee not found with this email address", 404));
    };

    if (employee.restePasswordToken === "1") {
        employee.restePasswordToken = "0";
        employee.password = req.body.password;
        await employee.save();
    } else {
        return next(new ErroHandler("Invaild Reset Password Link! Please try again", 500));
    }
    res.status(200).json({
        message: "Password has been successfully changed"
    });
});

exports.employeeresetpassword = catchAsyncError(async function (req, res, next) {
    const employee = await employeeModel.findById(req.id).exec();
    employee.password = req.body.password;
    await employee.save();
    sendToken(employee, 201, res);
});


exports.employeeupdate = catchAsyncError(async function (req, res, next) {
    const employee = await employeeModel.findByIdAndUpdate(req.id, req.body).exec();
    await employee.save();
    res.status(200).json({
        success: true,
        message: " Employee Details updated successfully",
    })
});

exports.employeeuploadavtar = catchAsyncError(async function (req, res, next) {
    const employee = await employeeModel.findById(req.id).exec();
    const file = req.files.organizationLogo;
    const modifiedFileName = uuid4() + Date.now() + path.extname(file.name);

    if (employee.organizationLogo.fileId !== "") {
        await imagekit.deleteFile(employee.organizationLogo.fileId);
    };

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName
    });

    employee.organizationLogo = { fileId, url };
    await employee.save();
    res.status(200).json({
        success: true,
        message: "Profile Updated Successfully",
    })
});