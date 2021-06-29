let     express         =require('express'),
        bodyParser      =require('body-parser'),
        randomString    =require('randomstring'),
        mongoose        =require('mongoose'),
        UserDetails     =require('./../models/userDetails'),
        nodemailer      =require('nodemailer'),
        app             =express();
module.exports= {
  create :(req,res) =>{
    const otp = randomString.generate({
      length:10,
      charset:'numeric'
    });
    var newUser={
        email:req.body.email,
        verification:{
            isVerified:false,
            verificationCode:otp
        },
        details:{
            name:req.body.name,
            phoneNumber: req.body.phoneNumber,
            dateOfBirth:req.body.dateOfBirth,
            resumeLink:req.body.resumeLink
        }
    };

    const mailToBeSent = `
    <h3> Hi ${req.body.name} </h3>
    <h4> OTP for creating an account is : </h4>
    <p> ${otp} </p>
    `;

    UserDetails.findOne({ email: req.body.email })
    .then((result) => {
        if (result != undefined) {
            console.log(result);
            console.log('returning true');
            return true;
        }
        else {
            console.log('returning false');
            return false;
        }
    })
    .then(alreadyExists=>{
        if (alreadyExists === true) {
            return res.send("email already exists");
        }
        else {
            UserDetails.create(newUser)
            .then((createdUser) => {
                // send mail here
                sendMail(mailToBeSent)
                    .then(() => {
                        console.log('email has been sent!');
                        res.send('email has been sent');
                        setTimeout(() => {
                            console.log('calling delete functions');
                            UserDetails.findOne({ 'email': req.body.email })
                            .then((foundUser) => {
                                console.log(foundUser);
                                if (foundUser.verification.isVerified == false) {
                                    // delete the user
                                    console.log("user found unverified!");
                                    UserDetails.findOneAndDelete({ 'email': foundUser.email })
                                    .then(deletedUser => {
                                        console.log(deletedUser);
                                    })
                                    .catch(err => {
                                        console.log(err);
                                    });
                                }
                            })
                            .catch(err => {
                                console.log(err);
                            })
                        }, 130000);
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch((err) => {
                console.log(err);
            });
        }
    })
    .catch(err => {
        console.log(err);
        console.log('returning false from error statement');
        alreadyExists = true;
    });
  }
}
async function sendMail(mailContent) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: "mvshashank22@gmail.com", // generated ethereal user
            pass: "Machinelearning2@" // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: 'Nodemailer mvshashank22@gmail.com', // sender address
        to: "Nodemailer f20180734@goa.bits-pilani.ac.in", // list of receivers
        subject: "nodemailer test", // Subject line
        text: "Hello world?", // plain text body
        html: mailContent, // html body
    });
};
