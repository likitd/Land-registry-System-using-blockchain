const express=require('express');
const app=express();
const mongoose=require('mongoose')
app.get('/',(req,resp)=>{
    resp.send(" i am back")
});
app.listen(5000);