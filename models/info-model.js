import mongoose from "mongoose";
const Schema = mongoose.Schema;

const InfoSchema = new Schema({
    //General Info
    uid:{
        type: String,
    },
    name: {
        type: String,
    },
    headline:{
        type: String,
    },

    //experience 
    
    Skills: [{
        type: String,
    }],

    yearOfExperience: {
        type: String,
    },    
});

const Project_info = new Schema({
    //Project URL
    uid:{
        type: String,
    },
    Project_title:[{
        type: String,
    }],
    Project_URL:[{
        type: String,
    }],
    Project_Description:[{
        type: String,
    }],
    Project_duration:[{
        type: String,
    }],    
    Oragnization_name:[{
        type: String,
    }],
    issuing_organization:[{
        type: String,
    }],
    Certifiacte_link:[{
        type: String,
    }],
    issueDate:[{
        type: Date,
    }],
});

const userCourse = new Schema({
    //Add course
    uid:{
        type: String,
    },
    Course_name:[{
        type: String,
    }],
    issuing_organization:[{ type: String,}],
});

const contact_info = new Schema({
    //contact_info
    uid:{
        type: String,
    },
    email:{
        type: String,
    },
    phone:{
        type: String,
    },
    skye_id:{
        type: String,
    },
});


const UserExperience = new Schema({
    //experience
    uid:{
        type: String,
    },
    company_name: {
        type: String,
    },
    position: {
        type: Date,
    },
    DateOfJoining: {
        type: Date,
    },
    DateOfLeaving: {
        type: String,
    },
    work_description: {
        type: String,
    },
    Used_skills:[{
        type: String,
    }],
});

const Info = mongoose.model('Info', InfoSchema);
const Project = mongoose.model('Project', Project_info);
const Course = mongoose.model('Course', userCourse);
const Contact = mongoose.model('Contact', contact_info);
const Experience = mongoose.model('Experience', UserExperience);

export default { Info };
export {
        Info,
        Project,
        Course,
        Contact,
        Experience
    
}