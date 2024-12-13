import jwt from 'jsonwebtoken'
import User from '../Model/user.model.js'

const auth = async (req,res,next) => {
  let token = req?.cookies?.Token;
  try {
      if(!token){
        return res.status(403).send({message: "Not Authenticated"})
      }
      let verifiedToken = jwt.verify(token, process.env.SECRET_KEY);
    
      if(verifiedToken){
        let user = await User.findOne({email: verifiedToken.email});
        req.user = user;
        next();
      }else{
        return res.status(403).json({message: "Not Authenticated"});
      }
  } catch (error) {
    return res.status(500).json({message :error.message})
  }
}

export default auth
