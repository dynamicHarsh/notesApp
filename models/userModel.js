
const mongoose = require("mongoose");
const emailValidator = require("email-validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


const db_link="mongodb+srv://dynamicHarsh:UZt3FXCRpIRxxn1k@cluster0.g4y9fre.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('user db connected');
})
.catch(function(err){
    console.log(err);
});



const userSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate: function(){
            return emailValidator.validate(this.email);
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 8
    },
    roles:{
        type: String,
        enum: ['admin','user','resaurantOwner','deliveryBoy'],
        default:'user'
    },
    profileImage:{
        type: String,
        default: 'path'
    },
    resetToken:{
        type: String,
        default: " "
    }
});



userSchema.pre('save',async function(){
    
    let salt=await bcrypt.genSalt();
    let hashedPassword=await bcrypt.hash(this.password,salt);
    this.password=hashedPassword;
    console.log("HashedPassword: ",hashedPassword);
    
})
userSchema.post('save',function(doc){
    console.log('after saving into database',doc);
})

//creating instance methods

userSchema.methods.createResetToken=async function(){
    const resetToken=crypto.randomBytes(32).toString("hex");
    this.resetToken=resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler=function(password){
    this.password=password;
    this.resetToken=undefined;
}



module.exports=mongoose.model('usermodel',userSchema);