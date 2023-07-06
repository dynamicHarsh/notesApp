const express=require('express');
const { protectRoute,isAuthorised } = require('../controller/authController');
const planRouter=express.Router();
const {getAllPlans,getPlan,createPlan,updatePlan,deletePlan,top3Plans}=require('../controller/planController');

planRouter
.route('/top3Plan')
.get(top3Plans)


//user specific plans
planRouter.use(protectRoute);
planRouter
.route('/:id')
.get(getPlan)

//admin specific
planRouter.use(isAuthorised(['admin','restaurantOwner']));
planRouter
.route('/crudPlan')
.post(createPlan)

//all Plans
planRouter
.route('/allPlans')
.get(getAllPlans)

planRouter
.route('/crudPlan/:id')
.patch(updatePlan)
.delete(deletePlan)



module.exports=planRouter;

