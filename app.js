const path=require('path');
const express = require("express");

const cookieParser=require('cookie-parser');
const app = express();
const userRouter=require('./routers/userRouter');
const planRouter=require('./routers/planRouter');



app.use(express.json());
app.use(cookieParser());
app.use("/user", userRouter);
app.use("/plan",planRouter);
app.use(express.static(path.join(__dirname,"./client/build")))
app.get("*",function(req,res){
  res.sendFile(path.join(__dirname,"./client/build/index.html"));
});


const port=process.env.PORT || 5000;
app.listen(port, "localhost", () => { 
  console.log(`server is listening at port ${port}`);
});







