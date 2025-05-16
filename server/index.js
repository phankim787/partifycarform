// setting up Express and Node.js

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Car from './models/Car.js';

dotenv.config();


const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('connected to MongoDB');
        console.log('connected to database:', mongoose.connection.name);
    })
    .catch(e => {
        console.error('MongoDB connection error', e);
    }
);

// API Route
app.get('/Dataset', async (req, res) => {

    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (e) {
        res.status(500).json({ message: 'error fetching car data', error: e});
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});