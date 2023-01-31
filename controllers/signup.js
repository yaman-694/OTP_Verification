import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import UserVerification from '../models/UserVerification.js';
import nodemailer from 'nodemailer';
import config from '../config/config.js';
import jwt from 'jsonwebtoken';
//JWT function
import createToken from '../middlewares/createjwt.js';

let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: config.nodemailDetails.email, // 
        pass: config.nodemailDetails.password //
    },
});

const signUP = async (req,res)=>{
    let {name,email,password} = req.body;
    name = name.trim();
    email = email.trim();
    password = password;

    if(!name || !email || !password){
        return res.status(400).json({status:'failed',message:'Please fill all the fields'});
    }
    else {
        User.find({email:email}).then((user)=>{
            if(user.length>0){
                return res.status(400).json({status:'failed',message:'User already exists'});
            }
            else {
                const saltRounds = bcrypt.genSaltSync(10);
                //hashing the password
                bcrypt
                .hash(password,saltRounds).then((hash)=>{
                    const newUser = new User({name,email,password:hash,verified:false});
                    newUser.save()
                    .then((user)=>{
                        const token = createToken(user);
                        sendVerificationEmail(user,token,res);
                        })
                        .catch((err)=>{
                            console.log(err);
                            res.json({status: 'Failed', message: 'Something went wrong'});
                        });
                })
                .catch((err)=>{
                    console.log(err);
                    res.json({status: 'Failed', message: 'Something went wrong'});
                });

            }
        });
    }
}

const sendVerificationEmail = async ({_id,email},token,res)=>{
    try{
        const otp = `${Math.floor(1000+Math.random()*9000)}`;

        // jwt.verify(token, config.jwt.TOKEN_HEADER_KEY, async (err, decoded) => {
            // console.log(decoded.id._id)
        
                // const uid = decoded.id._id;
                const mailOptions = {
                    from:  config.nodemailDetails.email,
                    to: email,
                    subject: 'OTP Verification',
                    html: `<p>OTP for verification is <b>  <a href="http://localhost:3000/api/v1/verify/${_id}"> ${otp}.</a></b>OTP is valid for 1 hour</p>`
                }
        
                const saltRounds = bcrypt.genSaltSync(10);
                const hashedOTP = await bcrypt.hash(otp, saltRounds);
        
                const newUserVerification = new UserVerification({
                    email,
                    userId: _id,    
                    otp:hashedOTP,
                    createdAt: Date.now(),
                    expiresAt: Date.now()+300000
                })
        
                await newUserVerification.save();
                await transporter.sendMail(mailOptions);
                res.cookie('token', token, { httpOnly: true, maxAge: 3600000 });
                res.json({
                    status: "Pending",
                    message: "OTP sent to your email",
                    data:{
                        userId: _id,
                        email
                    }
                });
            
        // });
       
    }catch(err){
        User.deleteOne({_id});
        console.log(err);
        res.json({status: 'Failed', message: 'Something went wrong'});
    }
}

export default signUP;