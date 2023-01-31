import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserVerificationSchema = new Schema({
    email: String,
    userId: String,
    otp: String,
    createdAt: Date,
    expiresAt: Date
});

const UserVerification = mongoose.model('UserVerification', UserVerificationSchema);
export default UserVerification;