const planModel = require("../models/planModel");



module.exports.getAllPlans=async function getAllPlans(req,res){
    try{
        let plans=await planModel.find();
    if(plans){
        res.json({
            message: 'all plans retrieved',
            data: plans
        })
    }
    else{
        res.json({
            message: 'no plans to display'
        })
    }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}

module.exports.getPlan=async function getPlan(req,res){
    try{
        let id=req.params.id;
    let plan=await planModel.findById(id);
    if(plan){
        res.json({
            message: 'plan retrieved',
            data: plan
        })
    }
    else{
       res.json({
        message: 'no plan found'
       })
    }
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    }
}


module.exports.createPlan=async function createPlan(req,res){
    try{
        let planData=req.body;
    let createdPlan=await planModel.create(planData);
    res.json({
        message: 'plan created successfully',
        data: createdPlan
    })
    }
    catch(err){
        res.json({
            message: err.message
        })
    } 
}

module.exports.deletePlan=async function deletePlan(req,res){
    try{
        let id=req.params.id;
    let deletedPlan=await planModel.findByIdAndDelete(id);
    res.json({
        message: 'plan deleted successfully',
        data:deletedPlan
    })
    }
    catch(err){
        res.status(500).json({
            message: err.message
        })
    } 
}

module.exports.updatePlan=async function updatePlan(req,res){
    try{
        let id=req.params.id;
        let dataToBeUpdated=req.body;
        
        let prevData=await planModel.findByIdAndUpdate(id,dataToBeUpdated);
        if(prevData){
            res.json({
                message: 'data updated successfully',
            })
        }
        else{
            res.json({
                message: 'data to be updated not found'
            })
        } 
    }
    catch(err){
        res.json({
            message: err.message
        })
    }
}


//get top 3 plans on the basis of rating
module.exports.top3Plans=async function top3Plans(req,res){
    try{
        const plans=await planModel.find().sort({ratingsAverage:-1}).limit(3);
    res.json({
        message: 'top 3 plans retrieved',
        data: plans
    })
    }
    catch(err){
        res.json({
            message: err.message
        })
    }
}