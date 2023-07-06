const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
// const JWT_KEY = require("../secrets");
const path = require("path");
const { sendMail } = require("../utility/nodemailer");
const { send } = require("process");

module.exports.signup = async function signup(req, res) {
  try {
    let obj = req.body;
    let user = await userModel.create(obj);
    if (user) {
      sendMail('signup',user);
      res.status(200).json({
        message: "user signed up",
        data: user,
      });
    } else {
      res.json({
        message: "error while signing up",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.login = async function login(req, res) {
  try {
    let data = req.body;
    if (data.email) {
      let user = await userModel.findOne({ email: data.email });
      if (user) {
        bcrypt.compare(data.password, user.password, function (err, result) {
          if (result) {
            let uid = user["_id"];
            let token = jwt.sign({ payload: uid }, process.env.JWT_KEY);
            res.cookie("login", token);
            res.status(200).json({
              message: "login successfull",
            });
          } else {
            res.json({
              message: "wrong login credentials",
            });
          }
        });
      } else {
        res.json({
          message: "user email not found",
        });
      }
    } else {
      res.json({
        message: "Empty email found:)",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

// to check roles

module.exports.isAuthorised = function isAuthorised(roles) {
  return function (req, res, next) {
    if (roles.includes(req.body.roles) == true) {
      next();
    } else {
      res.status(401).json({
        message: "admin only page",
      });
    }
  };
};

module.exports.protectRoute = async function protectRoute(req, res, next) {
  try {
    let token;
    if (req.cookies.login) {
      token = req.cookies.login;
      let payload = jwt.verify(token, process.env.JWT_KEY);
      if (payload) {
        const user = await userModel.findById(payload.payload);
        req.body.roles = user.roles;
        req.body.id = payload.payload;
        next();
      } else {
        
        res.json({
        message: "JWT does not match",
        });
      }
    } else {
      //browser
      const client=req.get('User-Agent');
      if(client.includes("Mozilla")==true){
        return  res.redirect('/user/login');
      }
      else{
        res.json({
          message: "please login first",
        });
      }
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};




module.exports.forgotPassword=async function forgotPassword(req,res){
  let {email}=req.body;
  try{
    const user=await userModel.findOne({email: email});
    if(user){
      //generate token and send mail
      const resetToken=user.createResetToken();
      user.resetToken=resetToken;
      await userModel.findByIdAndUpdate(user._id,user);
      console.log(user);
      let resetPasswordLink=`${req.protocol}://${req.get("host")}/user/resetPassword/${user.resetToken}`;
      sendMail(resetPasswordLink,user);
      res.json({
        message: 'reset link sent to your mail successfully'
      })
      //send mail through nodemailer
    }
    else{
      res.json({
        message: 'you need to signup first'
      })
    }
  }
  catch(err){
    res.json({
      message: err.message
    })
  }
}



module.exports.resetPassword=async function resetPassword(req,res){
  try{
    const token=req.params.token;
  let {password}=req.body;
  const user=await userModel.findOne({resetToken: token});
  if(user){
    //reset password handler will update pass in db
    user.resetPasswordHandler(password);
    await user.save();
    res.json({
      message: 'password reset successful'
    })
  }
  else{
    res.json({
      message: 'invalid reset token'
    })
  }
  }
  catch(err){
    res.json({
      message: err.message
    })
  }
  
}


module.exports.logout=function logout(req,res){
  res.cookie('login',' ',{maxAge:1});
  res.status(200).json({
    message: 'logged out successfully'
  })
}