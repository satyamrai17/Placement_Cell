//faculty-schema.js
import { SchemaTypes } from "mongoose";
import mongoose from "../connection.js";
const Schema = mongoose.Schema;
const facultySchema = new Schema({
    'name':{type:SchemaTypes.String, required:true},
    'email':{type:SchemaTypes.String, required:true, unique:true},
    'phone':{type:SchemaTypes.String},
    'password':{type:SchemaTypes.String, required:true, minLength:5, maxLength:100},
    'photoUrl': { type: SchemaTypes.String }
});
export const facultyModel = mongoose.model('faculty', facultySchema);