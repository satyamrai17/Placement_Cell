//student-schema.js
import { SchemaTypes } from "mongoose";
import mongoose from "../connection.js";

const Schema = mongoose.Schema;
const studentSchema = new Schema({
    'name':{type:SchemaTypes.String, required:true},
    'father':{type:SchemaTypes.String, required:true},
    'email':{type:SchemaTypes.String, required:true},
    'mobile':{type:SchemaTypes.String, required:true},
    'branch':{type:SchemaTypes.String, required:true},
    'year':{type:SchemaTypes.String, required:true},
    'address':{type:SchemaTypes.String, required:true},
    'password':{type:SchemaTypes.String, required:true},
    'photoUrl': { type: SchemaTypes.String }
});

const resultSchema = new Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true },
    testId: { type: mongoose.Schema.Types.ObjectId, ref: 'tests', required: true },
    answers: { type: Map, of: String, required: true },
    totalMarks: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const StudentModel = mongoose.model('students', studentSchema);
export const ResultModel = mongoose.model('results', resultSchema);