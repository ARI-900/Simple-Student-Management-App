const express = require('express');
const router = express.Router();


const {createStudent, getStudents, getStudentsID, updateStudent, deleteStudent} = require("../controllers/StudentControllers");
const {login, signup} = require("../controllers/Auth");


router.post("/create/student", createStudent);
router.get("/get/student", getStudents);
// router.get("/get/student/:id", getStudentID);
router.put("/update/student/:id", updateStudent);
router.delete("/delete/student/:id", deleteStudent);



// AUTH --> Login and Signup routes

router.post("/login/student", login);
router.post("/signup/student", signup);




module.exports = router;