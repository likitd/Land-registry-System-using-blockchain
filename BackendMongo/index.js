const express=require('express');
require('./DB/config')

const User=require('./DB/User');
const app=express();


app.use(express.json());

app.post('/signin', async(req,resp)=>{
    const user= new User(req.body);
    const data=await user.save();
    
});
app.listen(5000);