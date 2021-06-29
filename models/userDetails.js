let mongoose = require('mongoose');
var userDetailsSchema = new mongoose.Schema({
    email: String,
    verification: {
        isVerified:{
            type:Boolean,
            default:false
        },
        verificationCode:String
    },
    details: {
        name: String,
        phoneNumber: String,
        dateOfBirth: String,
        resumeLink: String
    }
});

module.exports = mongoose.model("userDetails", userDetailsSchema);
