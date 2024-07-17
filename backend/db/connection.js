//connection.js
const URL = "mongodb+srv://admin:admin1234@mycluster.xy6texj.mongodb.net/admindb?retryWrites=true&w=majority&appName=myCluster";
import mongoose from 'mongoose';
const promise = mongoose.connect(URL);
promise.then(data=>{
    console.log("Database Connected...");
}).catch(err=>{
    console.log("Error During DB Connection ", err);
})

export default mongoose;