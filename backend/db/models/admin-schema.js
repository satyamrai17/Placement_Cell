import { SchemaTypes } from "mongoose";
import mongoose from "../connection.js";
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
});

const testAssignmentSchema = new Schema({
    questions: { type: [questionSchema], required: true },
});


const adminSchema = new Schema({
    'name':{type:SchemaTypes.String, required:true},
    email: { type: SchemaTypes.String, required: true, unique: true, match: /^\S+@\S+\.\S+$/ },
    'phone':{type:SchemaTypes.String},
    'password':{type:SchemaTypes.String, required:true, minLength:5, maxLength:100},
    'photoUrl': { type: SchemaTypes.String }
});


const noteSchema = new Schema({
    name: { type: SchemaTypes.String, required: true },
    url: { type: SchemaTypes.String, required: true },
    uploadedAt: { type: SchemaTypes.Date, default: Date.now }
});

export const NoteModel = mongoose.model('Note', noteSchema);
export const AdminModel = mongoose.model('admin', adminSchema);
export const TestAssignmentModel = mongoose.model('TestAssignment', testAssignmentSchema);