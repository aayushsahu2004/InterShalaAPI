const express = require("express");
const router = express.Router();
const { resume, addEducation, editEducation, deleteEducation, addJobs, editJobs, deleteJobs, addInternship, editInternship, deleteInternship, addResponsebilities, editResponsebilities, deleteResponsebilities, addCourses, editCourses, deleteCourses, addProjects, editProjects, deleteProjects, addSkills, editSkills, deleteSkills, addAccomplishments, editAccomplishments, deleteAccomplishments } = require("../controllers/resumeController");
const { isAuthenticated } = require("../middlewares/auth");


// GET /
router.get("/", isAuthenticated, resume);

//POST /add-education
router.post("/add-education", isAuthenticated, addEducation);

//POST /edit-education/:eduid
router.post("/edit-education/:eduid", isAuthenticated, editEducation);
module.exports = router;

//POST /delete-education/:eduid
router.post("/delete-education/:eduid", isAuthenticated, deleteEducation);


//POST /add-jobs
router.post("/add-jobs", isAuthenticated, addJobs);

//POST /edit-jobs/:jobid
router.post("/edit-jobs/:jobid", isAuthenticated, editJobs);

//POST /delete-jobs/:jobid
router.post("/delete-jobs/:jobid", isAuthenticated, deleteJobs);


//POST /add-internship
router.post("/add-internship", isAuthenticated, addInternship);

//POST /edit-internship/:Internshipid
router.post("/edit-internship/:Internshipid", isAuthenticated, editInternship);

//POST /delete-internship/:Internshipid
router.post("/delete-internship/:Internshipid", isAuthenticated, deleteInternship);


//POST /add-responsebilities
router.post("/add-responsebilities", isAuthenticated, addResponsebilities);

//POST /edit-responsebilities/:Responsebilitiesid
router.post("/edit-responsebilities/:Responsebilitiesid", isAuthenticated, editResponsebilities);

//POST /delete-responsebilities/:Responsebilitiesid
router.post("/delete-responsebilities/:Responsebilitiesid", isAuthenticated, deleteResponsebilities);


//POST /add-courses
router.post("/add-courses", isAuthenticated, addCourses);

//POST /edit-courses/:Coursesid
router.post("/edit-courses/:Coursesid", isAuthenticated, editCourses);

//POST /delete-courses/:Coursesid
router.post("/delete-courses/:Coursesid", isAuthenticated, deleteCourses);


//POST /add-projects
router.post("/add-projects", isAuthenticated, addProjects);

//POST /edit-projects/:Projectsid
router.post("/edit-projects/:Projectsid", isAuthenticated, editProjects);

//POST /delete-projects/:Projectsid
router.post("/delete-projects/:Projectsid", isAuthenticated, deleteProjects);


//POST /add-skills
router.post("/add-skills", isAuthenticated, addSkills);

//POST /edit-skills/:Skillsid
router.post("/edit-skills/:Skillsid", isAuthenticated, editSkills);

//POST /delete-skills/:Skillsid
router.post("/delete-skills/:Skillsid", isAuthenticated, deleteSkills);


//POST /add-accomplishments
router.post("/add-accomplishments", isAuthenticated, addAccomplishments);

//POST /edit-accomplishments/:Accomplishmentsid
router.post("/edit-accomplishments/:Accomplishmentsid", isAuthenticated, editAccomplishments);

//POST /delete-accomplishments/:Accomplishmentsid
router.post("/delete-accomplishments/:Accomplishmentsid", isAuthenticated, deleteAccomplishments);


module.exports = router;