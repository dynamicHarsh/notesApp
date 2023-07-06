const mongoose=require('mongoose');

const db_link="mongodb+srv://dynamicHarsh:UZt3FXCRpIRxxn1k@cluster0.g4y9fre.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(db_link)
.then(function(db){
    // console.log(db);
    console.log('note db connected');
})
.catch(function(err){
    console.log(err);
});



const noteSchema=mongoose.Schema({
    title:{
        type: String,
        required: [true,'Heading is required']
    },
    note:{
        type: String,
        required: [true,'Writing a note is required']
    },
    user: {
        type: String,
        required: true
    },
    createdOn:{
        type: Date,
        required: true,
        default: Date.now()
    }
});

// const noteModel=mongoose.model('noteModel',noteSchema);

module.exports=mongoose.model('noteModel',noteSchema);

// (async function createNote(){
    
//     let resp=await noteModel.find();
//    console.log(resp);
// })();