// //faculty-controller.js
// import { facultyModel } from "../db/models/faculty-schema.js";
// import { hashing } from "../utils/encryption.js";

// export const facultyController = {
//     async login(request, response){
//         const facultyInfo = request.body;
//         console.log("faculty info in controller is ", facultyInfo);
//         const doc = await facultyModel.findOne({'email':facultyInfo.email}).exec()
//         if(doc && doc._id){
//             const planPassword = facultyInfo.password;
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
//         const facultyInfo = request.body;
//         facultyInfo.password = hashing.passwordHash(facultyInfo.password);

//         try{
//             const doc = await facultyModel.create(facultyInfo);
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
//     async profile(request, response){
//         const facultyName = request.params.username;
//         console.log('All params', facultyName);
//         response.json({message:facultyName + " Profile"});
//         // const doc = await facultyModel.findOne({'name':facultyName}).exec()
//         // if(doc && doc._id){
//         //     response.json({message:doc.name + doc.email + doc.phone});
//         //     console.log("profile is ...", doc.name);
//         // }
//     },
//     changePassword(request, response){
//         response.json({message:"Change Password"});
//     }
// }







// import { facultyModel } from "../db/models/faculty-schema.js";
// // import { hashing } from "../utils/encryption.js";

// export const facultyController = {
//     async login(request, response) {
//         const facultyInfo = request.body;
//         const doc = await facultyModel.findOne({'email': facultyInfo.email}).exec();
//         if (doc && doc._id) {
//             const planPassword = facultyInfo.password;
//             const dbPassword = doc.password;
//             if (planPassword == dbPassword) {
//                 response.json({ message: 'Welcome ' + doc.name, faculty: doc });
//             } else {
//                 response.json({ message: 'Invalid UserId or Password !' });
//             }
//         } else {
//             response.json({ message: 'Invalid UserId or Password !' });
//         }
//     },
    
//     async register(request, response) {
//         const facultyInfo = request.body;
//         // facultyInfo.password = hashing.passwordHash(facultyInfo.password);

//         try {
//             const doc = await facultyModel.create(facultyInfo);
//             if (doc && doc._id) {
//                 response.json({ message: "Faculty registered" });
//             } else {
//                 response.json({ message: "Problem in Registration" });
//             }
//         } catch (err) {
//             console.log("Register Error", err);
//             response.json({ message: "Problem in Registration" });
//         }
//     },

//     profile(request, response) {
//         response.json({ message: "Profile" });
//     }
// };



import { facultyModel } from "../db/models/faculty-schema.js";

export const facultyController = {
    async login(request, response) {
        const facultyInfo = request.body;
        const doc = await facultyModel.findOne({ 'email': facultyInfo.email }).exec();
        if (doc && doc._id) {
            const planPassword = facultyInfo.password;
            const dbPassword = doc.password;
            if (planPassword == dbPassword) {
                response.json({ message: 'Welcome ' + doc.name, faculty: doc });
            } else {
                response.json({ message: 'Invalid UserId or Password !' });
            }
        } else {
            response.json({ message: 'Invalid UserId or Password !' });
        }
    },
    
    async register(request, response) {
        const facultyInfo = request.body;
        try {
            const doc = await facultyModel.create(facultyInfo);
            if (doc && doc._id) {
                response.json({ message: "Faculty registered" });
            } else {
                response.json({ message: "Problem in Registration" });
            }
        } catch (err) {
            console.log("Register Error", err);
            response.json({ message: "Problem in Registration" });
        }
    },

    uploadPhoto(request, response) {
        const facultyId = request.body.facultyId;
        const photoUrl = `http://localhost:8789/uploads/${request.file.filename}`;
        
        facultyModel.findByIdAndUpdate(facultyId, { photoUrl: photoUrl }, { new: true })
            .then(updatedFaculty => {
                response.json({ message: "Photo uploaded successfully", photoUrl: photoUrl, faculty: updatedFaculty });
            })
            .catch(err => {
                console.error("Error updating faculty photo:", err);
                response.status(500).json({ message: "Error updating faculty photo" });
            });
    },

    async getFacultyList(request, response){
        try{
            const res = await facultyModel.find({}).exec();
            response.json({faculty: res});
        }
        catch(err){
            throw err;
        }
    }
};
