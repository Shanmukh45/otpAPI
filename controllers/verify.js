const UserDetails=require('./../models/userDetails');
module.exports= {
  verify : (req,res)=>
  {
    UserDetails.findOne({'email':req.body.email})
    .then(foundUser=>{
        if(!foundUser){
            return res.send('you otp must have expired try signing up again!');
        }
        if (req.params.verificationcode===foundUser.verificationCode){
            UserDetails.findByIdAndUpdate(foundUser._id, { $set: { verification: { isVerified:true } } })
            .then(()=>{
                console.log('mail verified');
                res.send('mail verified');
            })
            .catch(err=>{
                console.log(err);
                res.send(err);
            });
        }
        else{
            res.send('verification code you entered is wrong!');
        }
    })
    .catch(err=>{
        console.log(err);
    })
  }
};
