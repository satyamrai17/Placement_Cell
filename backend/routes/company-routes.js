//company-routes.js
// import express from "express";
// import { companyController } from "../controllers/company-controller.js";

// export const companyRoutes = express.Router();
// companyRoutes.get('/details', companyController.details);
// companyRoutes.post('/register', companyController.register);



import express from "express";
import { companyController } from "../controllers/company-controller.js";

export const companyRoutes = express.Router();
companyRoutes.get('/details', companyController.details);
companyRoutes.post('/register', companyController.register);
