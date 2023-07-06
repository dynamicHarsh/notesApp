const express = require("express");
const {getUser,updateUser,deleteUser,getAllUser,getNotes,createNote,deleteNote}=require('../controller/userController');
const {signup,login,isAuthorised,protectRoute,forgotPassword,resetPassword,logout}=require('../controller/authController');
const path=require('path');
const userRouter = express.Router();

//user specific options
userRouter
.route('/:id')
.patch(updateUser)
.delete(deleteUser)






//authentication
const staticPath=path.join(__dirname,'../public');
userRouter.use(express.static(staticPath));





userRouter
.route('/login')
.post(login)

userRouter
.route('/signup')
.post(signup)

//forget password

userRouter
.route('/resetPassword')
.post(resetPassword)

userRouter
.route('/forgotPassword')
.post(forgotPassword)



userRouter
.route('/logout')
.get(logout)

//profile page
userRouter.use(protectRoute);
userRouter
.route('/userProfile')
.get(getUser)

userRouter
.route('/notes')
.get(getNotes)
.post(createNote)

userRouter
.route('/notes/:id')
.delete(deleteNote);





//admin specific
userRouter.use(isAuthorised(['admin']));
userRouter.
route('/')
.get(getAllUser)
  
  module.exports=userRouter;



