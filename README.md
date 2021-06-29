# New libraries used are: 
* randomstring
* passport
* passport-local
* express-session
* nodemailer

---

## There are two different models used
1. Just for credentials
2. Other one is for storing the details

```javascript
let userDetailsSchema = new mongoose.Schema({
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

let userCredentialsSchema = new mongoose.Schema({
    username:String,
    password:String
});

```

> For further details of the functions please see the code

*P.S. The code is not modularised properly. It is just to check the functionality* 
