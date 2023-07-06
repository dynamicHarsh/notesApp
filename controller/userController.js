const userModel = require("../models/userModel");
const noteModel=require("../models/noteModel");
const { findOneAndUpdate } = require("../models/userModel");

module.exports.getUser = async function getUser(req, res) {
  // console.log(req.query);
  let id = req.body.id;
  let user = await userModel.findById(id);
  if (user) {
    res.json({ user });
  } else {
    res.json({
      message: "user not found"
    })
  }
};

module.exports.updateUser = async function updateUser(req, res) {
  try {
    let id = req.params.id;
    let user = await userModel.findById(id);
    let dataToBeUpdated = req.body;
    if (user) {
      await userModel.findOneAndUpdate({_id: id},dataToBeUpdated);
      res.json({
        message: "data updated successfully",
        
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.deleteUser = async function deleteUser(req, res) {
  try {
    let id = req.params.id;
    let deletedUser = await userModel.findByIdAndDelete(id);
    if (deletedUser) {
      res.json({
        message: "user deleted successfully",
        data: deletedUser,
      });
    } else {
      res.json({
        message: "user not found",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getAllUser = async function getAllUser(req, res) {
  try {
    let users = await userModel.find();
    if (users) {
      res.json({
        message: "users retreived successfully",
        data: users,
      });
    } else {
      res.json({
        message: "failed to fetch users",
      });
    }
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

module.exports.getNotes =async function getNotes(req,res){
  let id=req.body.id;
  console.log(id);
  const noteData=await noteModel.find({"user": id});
  res.json(noteData);
}

module.exports.createNote=async function createNotes(req,res){
  let newNote=req.body;
  newNote.user=req.body.id;
  const resp=await noteModel.create(newNote);
  res.json(resp);
}

module.exports.deleteNote=async function deleteNote(req,res){
  const id=req.params.id;
  let resp=await noteModel.findOneAndDelete({_id: id});
  res.json({
    message: "Data deleted successfully",
    data: resp
  })
}

// module.exports.updateUser=async function updateNote(req,res){
//   let id=req.params.id;
//   let dataToBeUpdated= req.body;
//   let resp=await findOneAndUpdate({_id:id},req.body);
//   res.json({
//     message: "Note updated successfully",
//     data: resp
//   })
// }