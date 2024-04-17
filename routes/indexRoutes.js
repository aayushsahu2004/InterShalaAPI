const express = require("express");
const router = express.Router();
const { homepage, currentuser, studentsignup, studentsignin, studentsignout, studentsendmail, studentforgetlink, studentresetpassword, studentupdate, studentuploadavtar} = require("../controllers/indexController");
const { isAuthenticated } = require("../middlewares/auth");


// GET /route
router.get("/", homepage);

// POST /student 
router.post("/student", isAuthenticated, currentuser);

// POST /student/signup
router.post("/student/signup", studentsignup);

// POST /student/signin
router.post("/student/signin", studentsignin);

// GET /student/signout
router.get("/student/signout", isAuthenticated, studentsignout)

// POST /student/send-mail
router.post("/student/send-mail", studentsendmail)

// GET /student/forget-password-link/:studentId
router.get("/student/forget-password-link/:id", studentforgetlink);

// POST /student/reset-password-link
router.post("/student/reset-password", isAuthenticated, studentresetpassword);

// POST /student/update
router.post("/student/update", isAuthenticated, studentupdate);

// POST /student/upload-avtar
router.post("/student/upload-avtar", isAuthenticated, studentuploadavtar);
module.exports = router;
