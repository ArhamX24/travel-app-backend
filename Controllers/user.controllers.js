import User from "../Model/user.model.js";

let cookieOption = {
    path: "/",
    httpOnly: true,
    secure: true,
    sameSite: 'none'
}

let signup = async (req,res) => {
  let {email} = req.body;
  try {
    let existingUser = await User.findOne({email: email});
    if(existingUser){
        return res.status(401).send({result: false, message: "Email already exists"})
    }
    let user = new User(req.body);
    let token = await user.generateToken();
    let newUser = await user.save();

    return res.cookie("Token", token, cookieOption).send({result: true, message: "Account Created Successfully", data: newUser})
  } catch (error) {
    return res.status(500).send({result: false, message:error.message})
  }
}

let login = async (req,res) => {
  let {email, password} = req?.body;

  try {
    let existingUser = await User.findOne({email: email});
    if(!existingUser){
      return res.status(401).send({result: false, message: "User Not Found"})
    }
    let correctUserPassword = await existingUser.comparePassword(password);
    if(correctUserPassword){
      let token = await existingUser.generateToken();
      return res.cookie("Token", token, cookieOption).send({result: true, message: "Login Success", data: existingUser})
    }
    else{
      return res.status(401).send({result: false, message: "Incorrect Password"})
    }
  } catch (error) {
    return res.status(500).send({result: false, message:error.message})
  }
}

const getUser = async (req,res) => {
  if(!req?.user){
    return res.status(401).send({result: false, message: "Unauthorized"})
  }else{
    return res.send({result: true, message: "User Found", data: req.user})
  }

  // let {email} = req?.params;

  // let userData = await User.findOne({email: email});

  // return res.send({result: true, message: "User Found", data: userData})
}

const updateUser = async (req,res) => {
  if(!req?.user){
    return res.status(401).send({result: false, message: "Unauthorized"})
  }else{
    try {
      let userData = req?.user;
      let newUserData = req?.body;
      let updatedUser = await User.findByIdAndUpdate(userData._id, newUserData, {new: true});
      return res.send({result: true, message: "User Updated Successfully", data: updatedUser})
    } catch (error) {
      return res.status(500).send({result: false, message:error.message})
    }
  }
}

const deleteUser = async (req,res) => {
  if(!req?.user){
    return res.status(401).send({result: false, message: "Unauthorized"})
  }else{
    try {
      let userData = req?.user;
      let deletedUser = await User.findByIdAndDelete(userData._id);
      return res.clearCookie("Token", cookieOption).send({result: true, message: "User Deleted Successfully", data: deletedUser})
    } catch (error) {
      return res.status(500).send({result: false, message:error.message})
    }
  }
}

const logout = (req,res) => {
  if(!req?.user){
    return res.status(401).send({result: false, message: "Unauthorized"})
  }else{
    try {
      return res.clearCookie("Token", cookieOption).send({result: true, message: "Logout Success"})
    } catch (error) {
      return res.status(500).send({result: false, message:error.message})
    }
  }
}



export {signup, login, getUser, updateUser, deleteUser, logout}
