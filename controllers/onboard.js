import {
    Info,
    Project,
    Course,
    Contact,
    Experience
} from '../models/info-model.js';


const UserProfile = async (req, res) => {
    try{
        const {pages} = req.params;
        console.log(pages);
        const uid = req.uid;
        console.log(uid);
        if(pages === 'info'){
            const {name,headline,Skills,yearOfExperience} = req.body;

            const info = new Info({
                uid,
                name,
                headline,
                Skills,
                yearOfExperience
            });
            await info.save();
            res.json({status: 'Success', message: 'Info saved successfully'});  

        }
        else if(pages === 'project'){
            const {Project_title,Project_URL,Project_Description,Project_duration,Oragnization_name,issuing_organization,Certifiacte_link,issueDate} = req.body;

            const project = new Project({
                uid,
                Project_title,
                Project_URL,
                Project_Description,
                Project_duration,
                Oragnization_name,
                issuing_organization,
                Certifiacte_link,
                issueDate
            });
            await project.save();
            res.json({status: 'Success', message: 'Project saved successfully'});
        }
        else if(pages === 'course'){
            const {Course_name,issuing_organization} = req.body;
            
            const course = new Course({
                uid,
                Course_name,
                issuing_organization
            });
            await course.save();
            res.json({status: 'Success', message: 'Course saved successfully'});

        }

    else if(pages === 'contact'){
            const {email,phone,website} = req.body;

            const contact = new Contact({
                uid,
                email,
                phone,
                website
            });
            await contact.save();
            res.json({status: 'Success', message: 'Contact saved successfully'});

    }
    else if(pages === 'experience'){
        const {company_name,position,DateOfJoining,DateOfLeaving,work_description,Used_skills} = req.body;

        const experience = new Experience({
            uid,
            company_name,
            position,
            DateOfJoining,
            DateOfLeaving,
            work_description,
            Used_skills
        });
        await experience.save();
        res.json({status: 'Success', message: 'Experience saved successfully'});
    }
    else{
        res.json({status: 'Failed in', message: 'Something went wrong'});
    }

    }catch(e){
        console.log(e);
        res.json({status: 'Failed', message: 'Something went wrong'});
    }
};

export default UserProfile;