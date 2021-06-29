const UserDetails=require('./../models/userDetails');
module.exports= {
  users :(req,res)=>{
    UserDetails.find()
    .then(users=>{
      if(users.verificationcode===true)
      {
          res.send(users);
      }
    })
    .catch(err=>{
        res.send(err);
    })

  }
};
