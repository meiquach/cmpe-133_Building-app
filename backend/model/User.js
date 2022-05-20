const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },

    phone: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    doctor: {
        type: String,
        required: true
    },
    appointment: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'
        }
    ],
    record: [
        {
            type: mongoose.Schema.Types.ObjectId, ref: 'Diagnosis'
        }
    ],
    
    
    refreshToken: String
});

module.exports = mongoose.model('User', userSchema);