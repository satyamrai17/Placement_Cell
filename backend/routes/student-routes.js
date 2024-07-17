// // student-routes.js
// import express from "express";
// import { studentController } from "../controllers/student-controller.js";

// export const studentRoutes = express.Router();
// studentRoutes.post('/student-login', studentController.login);
// studentRoutes.post('/student-register', studentController.register);


import express from "express";
import { studentController } from "../controllers/student-controller.js";
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export const studentRoutes = express.Router();
studentRoutes.post('/student-login', studentController.login);
studentRoutes.post('/student-register', upload.single('profileImage'), studentController.register);
studentRoutes.post('/upload-photo', upload.single('profileImage'), studentController.uploadPhoto);
studentRoutes.post('/student-test', studentController.saveStudentResult);
studentRoutes.get('/student-results', studentController.getStudentResults);
studentRoutes.get('/student-list',studentController.getStudentList);

