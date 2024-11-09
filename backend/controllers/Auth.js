const AuthUser = require("../models/AuthUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config(); 


exports.signup = async (req, res) => {

    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Please provide email and password",
            });
        }

        const existingStudent = await AuthUser.findOne({email: email});

        if(existingStudent) {
            return res.status(400).json({
                status: false,
                message: "Email already exists",
            });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        let newEntry = await AuthUser.create({
            email: email,
            password: hashPassword,
        });

        newEntry = newEntry.toObject();
        newEntry.password = null;

        console.warn(newEntry);

        res.status(200).json({
            status: true,
            message: "Student created successfully",
            data: newEntry,
        })
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



exports.login = async (req, res) => {

    try {

        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({
                status: false,
                message: "Please provide email and password",
            });
        }

        const existingStudent = await AuthUser.findOne({email:email});

        if(!existingStudent || !(bcrypt.compare(password, existingStudent.password)) ) {
            res.status(403).json({
                status: false,
                message: "Invalid credentials",
            })
        }

        // JWT TOKEN >>>
        const payload = {
            id: existingStudent._id,
            email: existingStudent.email,
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            status: true,
            message: "login Successfully",
            token: token,
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