import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    Year: Number,
    Make: String,
    Model: String,
    "Product Type": String,
    URL: String,
});

const Car = mongoose.model('Car', carSchema, 'cars');
export default Car;