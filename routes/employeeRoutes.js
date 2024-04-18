const express = require("express");
const router = express.Router();
const { homepage, currentEmployee, employeesignup, employeesignin, employeesignout, employeesendmail, employeeforgetlink, employeeresetpassword, employeeupdate, employeeuploadavtar, createinternship, readinternship, readsingleinternship, createjob, readjob, readsinglejob } = require("../controllers/employeeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET / route
router.get("/", homepage);

// POST /employee 
router.post("/employee", isAuthenticated, currentEmployee);

// POST /employee/signup
router.post("/employee/signup", employeesignup);

// POST /employee/signin
router.post("/employee/signin", employeesignin);

// GET /employee/signout
router.get("/employee/signout", isAuthenticated, employeesignout)

// POST /employee/send-mail
router.post("/employee/send-mail", employeesendmail)

// GET /employee/forget-password-link/:employeeid
router.get("/employee/forget-password-link/:id", employeeforgetlink);

// POST /employee/reset-password
router.post("/employee/reset-password", isAuthenticated, employeeresetpassword);

// POST /employee/update
router.post("/employee/update", isAuthenticated, employeeupdate);

// POST /employee/upload-avtar
router.post("/employee/upload-avtar", isAuthenticated, employeeuploadavtar);


// --------------- Internship --------------

// POST /employee/internship/create
router.post("/employee/internship/create", isAuthenticated, createinternship);

// POST /employee/internship/read
router.post("/employee/internship/read", isAuthenticated, readinternship);

// POST /employee/internship/read/:id
router.post("/employee/internship/read/:id", isAuthenticated, readsingleinternship);


// --------------- Job --------------

// POST /employee/job/create
router.post("/employee/job/create", isAuthenticated, createjob);

// POST /employee/job/read
router.post("/employee/job/read", isAuthenticated, readjob);

// POST /employee/job/read/:id
router.post("/employee/job/read/:id", isAuthenticated, readsinglejob);

module.exports = router;
