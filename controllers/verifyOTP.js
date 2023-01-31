import User from '../models/User.js';
import UserVerification from '../models/UserVerification.js';
import bcrypt from 'bcryptjs';


const verifyOTP = async (req, res) => {
    try {
        let { userId } = req.params;
        let { otp } = req.body;
        
        console.log("userId", userId, "otp", otp);
        if (!userId || !otp) {
            return res.status(400).json({ status: 'failed', message: 'Please fill all the fields' });
        }
        else {
            const UserRecordFromVerfication = await UserVerification.find({userId: userId});

            if (!UserRecordFromVerfication) {
                return res.status(400).json({ status: 'failed', message: 'User not found' });
            } else {
                console.log(UserRecordFromVerfication);
                const { expiresAt } = UserRecordFromVerfication[0];
                const hashedOTP = UserRecordFromVerfication[0].otp;

                //check if the otp is expired
                if (Date.now() > expiresAt) {
                    await UserVerification.deleteMany({userId:userId});
                    throw new Error('OTP expired');
                }
                else {
                    const validOTP = await bcrypt.compare(otp, hashedOTP);
                    if (!validOTP) {
                        throw new Error('Invalid OTP');
                    }
                    else {
                        await User.updateOne({ _id: userId }, { verified: true });
                        await UserVerification.deleteMany({userId:userId});
                        res.json({ status: 'VERIFIED', message: 'User verified successfully' });
                    }
                }
            }
        }
    }


    catch (err) {
        console.log(err);
        res.json({ status: 'Failed', message: 'Something went wrong' });
    }
};

export default verifyOTP;
