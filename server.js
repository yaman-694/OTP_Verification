import { sign } from 'crypto';
import express from 'express';
const app = express();
import mongoose from 'mongoose';
import signUP from './routes/signup.js';
import onboard from './routes/onboard.js';

app.use(express.json())
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://127.0.0.1:27017/OTPUser', { useNewUrlParser: true, useUnifiedTopology: true });


//routes
app.use('/api/v1',signUP);
app.use('/api/v1',onboard);



app.listen(3000, () => {
    console.log('Server is listening on port 3000');
    }
);