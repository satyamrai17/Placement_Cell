//company-schema.js
import { SchemaTypes } from "mongoose";
import mongoose from "../connection.js";
const Schema = mongoose.Schema;
const companySchema = new Schema({
    'company':{type:SchemaTypes.String, required:true},
    'profile':{type:SchemaTypes.String, required:true},
    'skills':{type:SchemaTypes.String, required:true},
    'package':{type:SchemaTypes.String, required:true},
    'eligibility':{type:SchemaTypes.String, required:true},
    'location':{type:SchemaTypes.String, required:true},
    'Roles':{type:SchemaTypes.String, required:true},
    'applylink':{type:SchemaTypes.String, required:true},
    'careerlink':{type:SchemaTypes.String, required:true}
});
export const companyModel = mongoose.model('companies', companySchema);