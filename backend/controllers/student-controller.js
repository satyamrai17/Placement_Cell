// //student-controller.js
// import { StudentModel } from "../db/models/student-schema.js";
// // import { hashing } from "../utils/encryption.js";

// export const studentController = {
//     async login(request, response) {
//         const studentInfo = request.body;
//         const doc = await StudentModel.findOne({'email':studentInfo.email}).exec();
//         if(doc && doc._id) {
//             const planPassword = studentInfo.password;
//             const dbPassword = doc.password;
//             if(planPassword == dbPassword) {
//                 response.json({message: 'Welcome ' + doc.name, student: doc});
//             } else {
//                 response.json({message: 'Invalid UserId or Password !'});
//             }
//         } else {
//             response.json({message: 'Invalid UserId or Password !'});
//         }
//     },
//     async register(request, response){
//         const studentInfo = request.body;
//         // studentInfo.password = hashing.passwordHash(studentInfo.password);
//         try{
//             const doc = await StudentModel.create(studentInfo);
//             if(doc && doc._id){
//                 response.json({message:"Student registered"});
//             }else{
//                 response.json({message:"Problem in Registration"});
//             }
//         }
//         catch(err){
//             console.log("Regiter Error ", err);
//             response.json({message:"Problem in Registration"});
//         }
//     },
//     profile(request, response){
//         response.json({message:"Profile"});
//     }
// }




import { response } from "express";
import { StudentModel } from "../db/models/student-schema.js";
import { ResultModel } from "../db/models/student-schema.js";


export const studentController = {
    async login(request, response) {
        const studentInfo = request.body;
        const doc = await StudentModel.findOne({ 'email': studentInfo.email }).exec();
        if (doc && doc._id) {
            const planPassword = studentInfo.password;
            const dbPassword = doc.password;
            if (planPassword == dbPassword) {
                response.json({ message: 'Welcome ' + doc.name, student: doc });
            } else {
                response.json({ message: 'Invalid UserId or Password !' });
            }
        } else {
            response.json({ message: 'Invalid UserId or Password !' });
        }
    },
    async register(request, response) {
        const studentInfo = request.body;
        // studentInfo.password = hashing.passwordHash(studentInfo.password);
        try {
            const doc = await StudentModel.create(studentInfo);
            if (doc && doc._id) {
                response.json({ message: "Student registered" });
            } else {
                response.json({ message: "Problem in Registration" });
            }
        } catch (err) {
            console.log("Register Error ", err);
            response.json({ message: "Problem in Registration" });
        }
    },
    uploadPhoto(request, response) {
        const studentId = request.body.studentId;
        const photoUrl = `http://localhost:8789/uploads/${request.file.filename}`;
        
        StudentModel.findByIdAndUpdate(studentId, { photoUrl: photoUrl }, { new: true })
            .then(updatedStudent => {
                response.json({ message: "Photo uploaded successfully", photoUrl: photoUrl, student: updatedStudent });
            })
            .catch(err => {
                console.error("Error updating student photo:", err);
                response.status(500).json({ message: "Error updating student photo" });
            });
    },




    async saveStudentResult(request, response) {
        const { testId, answers, totalMarks, studentId } = request.body;
    
        try {
            const result = new ResultModel({
                studentId,
                testId,
                answers,
                totalMarks,
                
            });
    
            await result.save();
            response.status(201).json({ message: 'Result saved successfully' });
        } catch (error) {
            console.error('Error saving result:', error);
            response.status(500).json({ message: 'Failed to save result', error: error.message });
        }
    },
    async getStudentResults(request, response) {
        // const studentId  = request.query; 
        
        try {
            
            // console.log('Received studentId:', studentId); 
            const results = await ResultModel.find();
            // const results = await ResultModel.find({ studentId }).populate('testId').exec();
            console.log('Fetched results:', results);
            response.status(200).json(results);
        } catch (error) {
            console.error('Error fetching student results:', error);
            response.status(500).json({ message: 'Failed to fetch results', error: error.message });
        }
    } ,
    
    async getStudentList(request, response){
        try{
            const res = await StudentModel.find({}).exec();
            response.json({students: res});
        }
        catch(err){
            throw err;
        }
    }
    
    
}
