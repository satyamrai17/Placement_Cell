// //app.js
// import express from "express";
// import { adminRoutes } from "./routes/admin-routes.js";
// import { companyRoutes } from "./routes/company-routes.js";
// import cors from "cors";
// import { facultyRoutes } from "./routes/faculty-routes.js";
// import { studentRoutes } from "./routes/student-routes.js";


// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/', adminRoutes);
// app.use('/company', companyRoutes);
// app.use('/student', studentRoutes);
// app.use('/faculty',facultyRoutes);

// //  Last middleware 404
// app.use((request, response, next)=>{
//     response.json({message:"Invalid URL"});
// })
// const server = app.listen(8789, (err)=>{
//     if(err){
//         console.log("Server Crashed !", err);
//     }else{
//         console.log("Server Up and Running...", server.address().port);
//     }
// })




// app.js
// import express from "express";
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
// import { adminRoutes } from "./routes/admin-routes.js";
// import { companyRoutes } from "./routes/company-routes.js";
// import cors from "cors";
// import { facultyRoutes } from "./routes/faculty-routes.js";
// import { studentRoutes } from "./routes/student-routes.js";
// import fs from "fs";

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Function to ensure the existence of the uploads directory
// const ensureUploadsDirectory = () => {
//     const uploadsDirectory = join(__dirname, 'uploads');
//     if (!fs.existsSync(uploadsDirectory)) {
//         fs.mkdirSync(uploadsDirectory);
//     }
// };

// // Call the function to ensure the existence of the uploads directory
// ensureUploadsDirectory();

// // Set up the static middleware to serve uploaded files
// app.use(express.static(join(__dirname, 'uploads')));

// app.use('/', adminRoutes);
// app.use('/company', companyRoutes);
// app.use('/student', studentRoutes);
// app.use('/faculty', facultyRoutes);

// // Last middleware 404
// app.use((request, response, next) => {
//     response.json({ message: "Invalid URL" });
// });

// const server = app.listen(8789, (err) => {
//     if (err) {
//         console.log("Server Crashed !", err);
//     } else {
//         console.log("Server Up and Running...", server.address().port);
//     }
// });







// app.js
import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { adminRoutes } from "./routes/admin-routes.js";
import { companyRoutes } from "./routes/company-routes.js";
import cors from "cors";
import { facultyRoutes } from "./routes/faculty-routes.js";
import { studentRoutes } from "./routes/student-routes.js";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

app.use('/uploads',express.static(join(__dirname, 'uploads')));

app.use('/', adminRoutes);
app.use('/company', companyRoutes);
app.use('/student', studentRoutes);
app.use('/faculty', facultyRoutes);

// Last middleware 404
app.use((request, response, next) => {
    response.status(404).json({ message: "Invalid URL" });
});

const server = app.listen(8789, (err) => {
    if (err) {
        console.log("Server Crashed !", err);
    } else {
        console.log("Server Up and Running...", server.address().port);
    }
});

