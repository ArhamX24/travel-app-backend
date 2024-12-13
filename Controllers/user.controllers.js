import User from "../Model/user.model.js";

let cookieOption = {
    httpOnly: true,
    secure: true,
    samesite: 'none'
}

let signup = async (req,res) => {
  let {email} = req.body;
  try {
    let existingUser = await User.findOne({email: email});
    if(existingUser){
        return res.status(401).json({result: false, message: "Email already exists"})
    }
    let user = new User(req.body);
    let token = await user.generateToken();
    let newUser = await user.save();

    return res.cookie("Token", token, cookieOption).send({result: true, message: "Account Created Successfully", data: newUser})
  } catch (error) {
    return res.status(500).json({result: false, message:error.message})
  }
}

let login = async (req,res) => {
  let {email, password} = req?.body;

  try {
    let existingUser = await User.findOne({email: email});
    if(!existingUser){
      return res.status(401).json({result: false, message: "User Not Found"})
    }
    let correctUserPassword = await existingUser.comparePassword(password);
    if(correctUserPassword){
      let token = await existingUser.generateToken();
      return res.cookie("Token", token, cookieOption).send({result: true, message: "Login Success", data: existingUser})
    }
    else{
      return res.status(401).json({result: false, message: "Incorrect Password"})
    }
  } catch (error) {
    return res.status(500).json({result: false, message:error.message})
  }
}


export {signup, login}
