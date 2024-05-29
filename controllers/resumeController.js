const { catchAsyncError } = require("../middlewares/catchAsyncErrors");
const studentModel = require("../models/studentModel");
const ErroHandler = require("../utils/ErrorHandler");
const { v4: uuid4 } = require("uuid");


exports.resume = catchAsyncError(async function (req, res, next) {
    const { resume } = await studentModel.findById(req.id).exec();
    res.json({ message: "Secure Resume Page", resume });
});

// ADD - EDUCATION    EDIT - EDUCATION    DELETE - EDUCATION
exports.addEducation = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuid4() });
    await student.save();
    res.json({ message: "Education Added!" });
});

exports.editEducation = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex(i => i.id === req.params.eduid);
    if (eduIndex === -1) {
        return next(new ErroHandler("Education not found!", 404));
    }
    student.resume.education[eduIndex] = { ...student.resume.education[eduIndex], ...req.body };
    await student.save();
    res.json({ message: "Education Updated!", eduIndex});
});

exports.deleteEducation = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const Filtereducation = student.resume.education.filter(i => i.id !== req.params.eduid);
    student.resume.education = Filtereducation;
    await student.save();
    res.json({ message: "Education Deleted" });
});


// ADD - JOBS    EDIT - JOBS    DELETE - JOBS
exports.addJobs = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    student.resume.jobs.push({ ...req.body, id: uuid4() });
    await student.save();
    res.json({ message: "Jobs Added!" });
});

exports.editJobs = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const jobIndex = student.resume.jobs.findIndex(i => i.id === req.params.jobid);
    if (jobIndex === -1) {
        return next(new ErroHandler("Jobs not found!", 404));
    }
    student.resume.jobs[jobIndex] = { ...student.resume.jobs[jobIndex], ...req.body };
    await student.save();
    res.json({ message: "Jobs Updated!" });
});

exports.deleteJobs = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const FilteredJobs = student.resume.jobs.filter(i => i.id !== req.params.Internshipid);
    student.resume.jobs = FilteredJobs;
    await student.save();
    res.json({ message: "Jobs Deleted" });
});


// ADD - INTERNSHIP    EDIT - INTERNSHIP    DELETE - INTERNSHIP
exports.addInternship = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    student.resume.internship.push({ ...req.body, id: uuid4() });
    await student.save();
    res.json({ message: "Internship Added!" });
});

exports.editInternship = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const internshipIndex = student.resume.internship.findIndex(i => i.id === req.params.Internshipid);
    if (internshipIndex === -1) {
        return next(new ErroHandler("Internship not found!", 404));
    }
    student.resume.internship[internshipIndex] = { ...student.resume.internship[internshipIndex], ...req.body };
    await student.save();
    res.json({ message: "Internship Updated!" });
});

exports.deleteInternship = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const FilteredInternship = student.resume.internship.filter(i => i.id !== req.params.Internshipid);
    student.resume.internship = FilteredInternship;
    await student.save();
    res.json({ message: "Internship Deleted" });
});


// ADD - RESPONSEBILITIES    EDIT - RESPONSEBILITIES    DELETE - RESPONSEBILITIES
exports.addResponsebilities = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    student.resume.responsebilities.push({ ...req.body, id: uuid4() });
    await student.save();
    res.json({ message: "Responsibilities Added!" });
});

exports.editResponsebilities = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const responsebilitiesIndex = student.resume.responsebilities.findIndex(i => i.id === req.params.Responsebilitiesid);
    if (responsebilitiesIndex === -1) {
        return next(new ErroHandler("Responsebilities not found!", 404));
    }
    student.resume.responsebilities[responsebilitiesIndex] = { ...student.resume.responsebilities[responsebilitiesIndex], ...req.body };
    await student.save();
    res.json({ message: "Responsibilities Updated!" });
});

exports.deleteResponsebilities = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const FilteredResponsebilities = student.resume.responsebilities.filter(i => i.id !== req.params.Responsebilitiesid);
    student.resume.responsebilities = FilteredResponsebilities;
    await student.save();
    res.json({ message: "Responsibilities Deleted" });
});

// ADD - COURSES    EDIT - COURSES    DELETE - COURSES
exports.addCourses = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuid4() });
    await student.save();
    res.json({ message: "Courses Added!" });
});

exports.editCourses = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const coursesIndex = student.resume.courses.findIndex(i => i.id === req.params.Coursesid);
    if (coursesIndex === -1) {
        return next(new ErroHandler("Courses not found!", 404));
    }
    student.resume.courses[coursesIndex] = { ...student.resume.courses[coursesIndex], ...req.body };
    await student.save();
    res.json({ message: "Courses Updated!" });
});

exports.deleteCourses = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const Filteredcourses = student.resume.courses.filter(i => i.id !== req.params.Coursesid);
    student.resume.courses = Filteredcourses;
    await student.save();
    res.json({ message: "Courses Deleted" });
});

// ADD - PROJECTS    EDIT - PROJECTS    DELETE - PROJECTS
exports.addProjects = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuid4() });
    await student.save();
    res.json({ message: "Projects Added!" });
});

exports.editProjects = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const projectsIndex = student.resume.projects.findIndex(i => i.id === req.params.Projectsid);
    if (projectsIndex === -1) {
        return next(new ErroHandler("Projects not found!", 404));
    }
    student.resume.projects[projectsIndex] = { ...student.resume.projects[projectsIndex], ...req.body };
    await student.save();
    res.json({ message: "Projects Updated!" });
});

exports.deleteProjects = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const Filteredprojects = student.resume.projects.filter(i => i.id !== req.params.Projectsid);
    student.resume.projects = Filteredprojects;
    await student.save();
    res.json({ message: "Projects Deleted" });
});

// ADD - SKILLS    EDIT - SKILLS    DELETE - SKILLS
exports.addSkills = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuid4() });
    await student.save();
    res.json({ message: "Skills Added!" });
});

exports.editSkills = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const skillsIndex = student.resume.skills.findIndex(i => i.id === req.params.Skillsid);
    if (skillsIndex === -1) {
        return next(new ErroHandler("Skills not found!", 404));
    }
    student.resume.skills[skillsIndex] = { ...student.resume.skills[skillsIndex], ...req.body };
    await student.save();
    res.json({ message: "Skills Updated!" });
});

exports.deleteSkills = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const Filteredskills = student.resume.skills.filter(i => i.id !== req.params.Skillsid);
    student.resume.skills = Filteredskills;
    await student.save();
    res.json({ message: "Skills Deleted" });
});

// ADD - ACCOMPLISHMENT    EDIT - ACCOMPLISHMENT    DELETE - ACCOMPLISHMENT
exports.addAccomplishments = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuid4() });
    await student.save();
    res.json({ message: "Accomplishments Added!" });
});

exports.editAccomplishments = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const accomplishmentsIndex = student.resume.accomplishments.findIndex(i => i.id === req.params.Accomplishmentsid);
    if (accomplishmentsIndex === -1) {
        return next(new ErroHandler("Accomplishments not found!", 404));
    }
    student.resume.accomplishments[accomplishmentsIndex] = { ...student.resume.accomplishments[accomplishmentsIndex], ...req.body };
    await student.save();
    res.json({ message: "Accomplishments Updated!" });
});

exports.deleteAccomplishments = catchAsyncError(async function (req, res, next) {

    const student = await studentModel.findById(req.id).exec();
    const Filteredaccomplishments = student.resume.accomplishments.filter(i => i.id !== req.params.Accomplishmentsid);
    student.resume.accomplishments = Filteredaccomplishments;
    await student.save();
    res.json({ message: "Accomplishments Deleted" });
});