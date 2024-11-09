const Student = require("../models/Student");
const bcrypt = require("bcrypt");


// CREATE NEW STUDENT ENTRY >>>>

exports.createStudent = async (req, res) => {
    try {
        // const newStudent = new Student(req.body);
        // await newStudent.save();

        const {name, age, grade, email, password} = req.body;

        if(!name || !age || !grade || !email || !password) {
            return res.status(400).json({
                status: false,
                message: "All fields are required",
            });
        }
        
        const hashPassword = await bcrypt.hash(password, 10);

        const newStudent = await Student.create({
            name,
            age,
            grade,
            email,
            password: hashPassword,
        });

        res.status(200).json({
            status: true,
            message: "Student created successfully",
            data: newStudent,
        });
    }
    catch(error) {
        console.warn("Internal server issues");
        console.log(error.message);

        res.status(500).json({
            status: false,
            message: "Failed to create student",
            data: error.message,
        })
    }
}


// GET STUDENT ENTRIES >>>>

exports.getStudents = async (req, res) => {
    try {
        const allStudents = await Student.find({});
        console.warn(allStudents);

        res.status(200).json({
            status: true,
            message: "All students fetched successfully",
            data: allStudents,
        });
    }
    catch(error) {
        console.warn("Internal server issues");
        console.log(error.message);

        res.status(500).json({
            status: false,
            message: "Failed to create student",
            data: error.message,
        })
    }
}



// UPDATE STUDENT DATAS >>>

exports.updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const {name, age, grade, email, password} = req.body;

        const hashPassword = await bcrypt.hash(password, 10);

        const updatedStudent = await Student.findByIdAndUpdate(
           {_id: id},
           {name, age, grade, email, password:hashPassword},
           {new: true}
        );

        // If Id is incorrect or not found >>>>
        if(!updatedStudent) {
            console.log("<<< Incorrect Id >>> ");
            res.status(404).json({
                status: false,
                message: "Student not found due to Incorrect ID",
                data: null,
            });
        }
        else {
            console.log("<<< Student updated successfully >>> ");
            res.status(200).json({
                status: true,
                message: "Student updated successfully",
                data: updatedStudent,
            });
        }
    }

    catch(error) {
        console.warn("Internal server issues");
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: "Failed to update student",
            data: error.message,
        });
    }
}



// DELETE STUDENT ENTRY >>>>

exports.deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;
        
        const deletedStudent = await Student.findByIdAndDelete(id);

        console.log("Deleted Student Entry: ");
        console.warn(deletedStudent);

        res.status(200).json({
            status: true,
            message: "Student deleted successfully",
            data: deletedStudent,
        });

    }
    catch(error) {
        console.warn("Internal server issues");
        console.log(error.message);
        res.status(500).json({
            status: false,
            message: "Failed to delete student",
            data: error.message,
        });
    }
}