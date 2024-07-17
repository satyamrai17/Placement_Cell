// import { AdminModel } from "../db/models/admin-schema.js";
// import { hashing } from "../utils/encryption.js";

// export const adminController = {
//     async login(request, response){
//         const adminInfo = request.body;
//         console.log("admin info in controller is ", adminInfo);
//         const doc = await AdminModel.findOne({'email':adminInfo.email}).exec()
//         if(doc && doc._id){
//             const planPassword = adminInfo.password;
//             const dbPassword = doc.password;
//             if(hashing.matchPassword(planPassword, dbPassword)){
//                 response.json({message:'Welcome '+ doc.name});
//             }
//             else{
//                 response.json({message:'Invalid UserId or Password !'});
//             }
//         }else{
//             response.json({message:'Invalid UserId or Password !'});
//         }
//     },
//     async register(request, response){
//         const adminInfo = request.body;
//         adminInfo.password = hashing.passwordHash(adminInfo.password);

//         try{
//             const doc = await AdminModel.create(adminInfo);
//             if(doc && doc._id){
//                 response.json({message:"Registered Successfully"});
//             }else{
//                 response.json({message:"Problem in Registering"});
//             }
//         }
//         catch(err){
//             console.log("Register Err", err);
//             response.json({message:"Problem in Registering"});
//         }
//     },
//     profile(request, response){
//         const adminName = request.params.username;
//         console.log('All params', adminName);
//         response.json({message:adminName + " Profile"});
//     },
//     changePassword(request, response){
//         response.json({message:"Change Password"});
//     }
// }




// import { AdminModel } from "../db/models/admin-schema.js";


// export const adminController = {
//     async login(request, response) {
//         const adminInfo = request.body;
//         const doc = await AdminModel.findOne({'email': adminInfo.email}).exec();
//         if (doc && doc._id) {
//             const planPassword = adminInfo.password;
//             const dbPassword = doc.password;
//             if (planPassword === dbPassword) {
//                 response.json({ message: 'Welcome ' + doc.name, admin: doc });
//             } else {
//                 response.json({ message: 'Invalid UserId or Password!' });
//             }
//         } else {
//             response.json({ message: 'Invalid UserId or Password!' });
//         }
//     },

//     async register(request, response) {
//         const adminInfo = request.body;
//         // adminInfo.password = hashing.passwordHash(adminInfo.password);

//         try {
//             const doc = await AdminModel.create(adminInfo);
//             if (doc && doc._id) {
//                 response.json({ message: "Admin registered" });
//             } else {
//                 response.json({ message: "Problem in Registration" });
//             }
//         } catch (err) {
//             console.log("Register Error", err);
//             response.json({ message: "Problem in Registration" });
//         }
//     },

//     async profile(request, response) {
//         const adminName = request.params.username;
//         response.json({ message: adminName + " Profile" });
//     }
// };





import { AdminModel } from "../db/models/admin-schema.js";
import { TestAssignmentModel } from "../db/models/admin-schema.js";
import { NoteModel } from "../db/models/admin-schema.js";

export const adminController = {
    async login(request, response) {
        const adminInfo = request.body;
        const doc = await AdminModel.findOne({ 'email': adminInfo.email }).exec();
        if (doc && doc._id) {
            const planPassword = adminInfo.password;
            const dbPassword = doc.password;
            if (planPassword === dbPassword) {
                response.json({ message: 'Welcome ' + doc.name, admin: doc });
            } else {
                response.json({ message: 'Invalid UserId or Password!' });
            }
        } else {
            response.json({ message: 'Invalid UserId or Password!' });
        }
    },

    async register(request, response) {
        const adminInfo = request.body;
        try {
            const doc = await AdminModel.create(adminInfo);
            if (doc && doc._id) {
                response.json({ message: "Admin registered" });
            } else {
                response.json({ message: "Problem in Registration" });
            }
        } catch (err) {
            console.log("Register Error", err);
            response.json({ message: "Problem in Registration" });
        }
    },

    uploadPhoto(request, response) {
        const adminId = request.body.adminId;
        const photoUrl = `http://localhost:8789/uploads/${request.file.filename}`;
        
        AdminModel.findByIdAndUpdate(adminId, { photoUrl: photoUrl }, { new: true })
            .then(updatedAdmin => {
                response.json({ message: "Photo uploaded successfully", photoUrl: photoUrl, admin: updatedAdmin });
            })
            .catch(err => {
                console.error("Error updating admin photo:", err);
                response.status(500).json({ message: "Error updating admin photo" });
            });
    },

    
    async saveTestAssignment(request, response) {
        const { questions } = request.body;

        try {
            if (!questions || questions.length === 0) {
                return response.status(400).json({ message: 'No questions provided' });
            }

            const testAssignment = new TestAssignmentModel({ questions });
            await testAssignment.save();
            response.status(201).json({ message: 'Test assignment saved successfully', testAssignment });
        } catch (error) {
            console.error('Error saving test assignment:', error);
            response.status(500).json({ message: 'Failed to save test assignment', error: error.message });
        }

    },

    async getAllTestAssignments(request, response) {
        try {
          const testAssignments = await TestAssignmentModel.find({});
          response.status(200).json(testAssignments);
        } catch (error) {
          console.error('Error fetching test assignments:', error);
          response.status(500).json({ message: 'Error fetching test assignments' });
        }
      },


      async uploadNotes(request, response) {
        if (!request.file) {
            return response.status(400).json({ message: 'No file uploaded' });
        }
        
        const fileName = request.file.filename;
        const fileUrl = `http://localhost:8789/uploads/${fileName}`; // Corrected URL
    
        try {
            const note = await NoteModel.create({ name: fileName, url: fileUrl });
            response.status(200).json({ message: 'File uploaded successfully', note });
        } catch (error) {
            console.error('Error uploading notes:', error);
            response.status(500).json({ message: 'Error uploading notes' });
        }
    },
    

    async getNotes(request, response) {
        try {
            const notes = await NoteModel.find({});
            response.status(200).json(notes);
        } catch (error) {
            console.error('Error fetching notes:', error);
            response.status(500).json({ message: 'Error fetching notes' });
        }
    },

};