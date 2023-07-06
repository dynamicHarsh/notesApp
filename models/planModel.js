
const mongoose = require("mongoose");
const db_link="mongodb+srv://dynamicHarsh:UZt3FXCRpIRxxn1k@cluster0.g4y9fre.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('plan db connected');
})
.catch(function(err){
    console.log(err);
});

const planSchema=new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        maxLength: [20,'plan name should not exceed 20 characters']
    },
    duration:{
        type: Number,
        required: true
    },
    price:{
        type:Number,
        required: [true,'price not entered']
    },
    ratingsAverage:{
        type: Number
    },
    discount:{
        type:Number,
        validate: [function(){
            return this.discount<100;
        },'discount should not exceed price']
    }
});
// const planModel=mongoose.model('planModel',planSchema);
// (async function createPlan(){
//     let planobj={
//         name: 'Maggi',
//         duration: 2,
//         price: 14,
//         ratingsAverage: 5,
//         discount: 0
//     }
//     let data=await planModel.create(planobj);
//     console.log(data);
//     // another method to save file
//     // const doc=new planModel(planobj);
//     // await doc.save;

// })();//immediately invoke function

//model

module.exports=mongoose.model('planModel',planSchema);
