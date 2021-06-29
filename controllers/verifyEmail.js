const UserDetails=require('./../models/userDetails');
module.exports ={
  verifyemail : (req,res)=>
  {
    UserDetails.findOne({'email':req.body.email})
    .then((result)=>{
      if(result)
      {
        res.send("email already exists");
        console.log("email already exists");
      }
      else{
        res.send("email available");
        console.log("email available");
      }
    })
    .catch(err=>{
        res.send(err);
        console.log(err);
    });
  }
};
