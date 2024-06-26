require("dotenv").config({ path: "./.env" });
const express = require("express");
const app = express();
const cors = require("cors");


//db connection 
require("./models/database").connectDatabase();

// Logger
const logger = require("morgan");
app.use(logger("tiny"));

// CORS configuration

const corsOption = {
    origin:' http://localhost:5173',
    credentials:true
}

app.use(cors(corsOption));

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Session and Cookie
const session = require("express-session");
const cookieparser = require("cookie-parser");
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET
}));
app.use(cookieparser());

// Express file upload
const fileupload = require("express-fileupload");
app.use(fileupload());

// routes
app.use("/student/", require("./routes/indexRoutes"));
app.use("/resume/", require("./routes/resumeRoutes"));
app.use("/employee/", require("./routes/employeeRoutes"));

// error Handling
const ErrorHandler = require("./utils/ErrorHandler");
const { genetatedErrors } = require("./middlewares/errors");
app.use(genetatedErrors);


// Route not found 
app.all("*", function (req, res, next) {
    next(new ErrorHandler(`Requeted URL Not Found ${req.url}`, 404))
});


app.listen(process.env.PORT, console.log(`Server running on port ${process.env.PORT}`));