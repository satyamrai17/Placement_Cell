// import express from 'express';
// import { adminController } from "../controllers/admin-controller.js";

// export const adminRoutes = express.Router();
// // adminRoutes.get("/profile", adminController.profile);
// adminRoutes.post("/register", adminController.register);
// adminRoutes.post("/login", adminController.login);
// // adminRoutes.put("/change-password");
// // adminRoutes.delete("/remove-account");



import express from 'express';
import { adminController } from "../controllers/admin-controller.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


// const fileFilter = (req, file, cb) => {
//     const filetypes = /pdf/;
//     const mimetype = filetypes.test(file.mimetype);
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetype && extname) {
//         return cb(null, true);
//     }
//     cb("Error: Only PDF files allowed!");
// };



const upload = multer({ storage: storage });

export const adminRoutes = express.Router();
adminRoutes.post("/register", adminController.register);
adminRoutes.post("/login", adminController.login);
adminRoutes.post("/upload-photo", upload.single('profileImage'), adminController.uploadPhoto);
adminRoutes.get('/get-all-test-assignments', adminController.getAllTestAssignments);
adminRoutes.post('/save-test-assignment', adminController.saveTestAssignment);
adminRoutes.post("/upload", upload.single('pdfFile'), adminController.uploadNotes);
adminRoutes.get('/notes', adminController.getNotes);
