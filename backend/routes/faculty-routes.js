// import express from 'express';
// import { facultyController } from "../controllers/faculty-controller.js";

// export const facultyRoutes = express.Router();
// // facultyRoutes.get("/faculty-profile/:username", facultyController.profile);
// facultyRoutes.post("/faculty-register", facultyController.register);
// facultyRoutes.post("/faculty-login", facultyController.login);
// facultyRoutes.post("/faculty-upload-photo", upload.single('profileImage'), facultyController.uploadPhoto);
// // facultyRoutes.put("/change-password");
// // facultyRoutes.delete("/remove-account");



// faculty-routes.js
import express from 'express';
import { facultyController } from "../controllers/faculty-controller.js";
import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

export const facultyRoutes = express.Router();
facultyRoutes.post("/faculty-register", facultyController.register);
facultyRoutes.post("/faculty-login", facultyController.login);
facultyRoutes.get("/faculty-list", facultyController.getFacultyList);
facultyRoutes.post("/faculty-upload-photo", upload.single('profileImage'), facultyController.uploadPhoto);
