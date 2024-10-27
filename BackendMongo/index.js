const express=require('express');
require('./DB/config')

const User=require('./DB/User');

const Convention=require('./DB/ConventionalReq');

const Transfer=require('./DB/TransferReq');
const app=express();

const cors=require('cors');
app.use(express.json());
app.use(cors());

//sign up page
app.post('/signin', async(req,resp)=>{
    const user= new User(req.body);
    const data=await user.save();

    
});


//store conventional request in mongodb
app.post('/userpage',async(req,resp)=>{
    const land=new Convention(req.body);
    const data=await land.save();
});
app.get('/make_convention', async(req,resp)=>{
    const land=await Convention.find({});
    resp.send(land);
})
app.delete('/make_convention/:SurveyNo/:HissNo',async (req,resp)=>{
    const SurveyNo=parseInt(req.params.SurveyNo,10);
    const {HissNo}=req.params;
    const  land=await Convention.findOneAndDelete({SurveyNo,HissNo});
   
})





//store transfer request in mongodb
app.post('/userpage',async(req,resp)=>{
    const land=new Transfer(req.body);
    const data=await land.save();
})
app.get('/make_transfer', async(req,resp)=>{
    const land=await Transfer.find({});
    resp.send(land);
})
app.delete('/make_convention/:SurveyNo/:HissNo',async (req,resp)=>{
    const SurveyNo=parseInt(req.params.SurveyNo,10);
    const {HissNo}=req.params;
    const  land=await Transfer.findOneAndDelete({SurveyNo,HissNo});
   
})

app.listen(5000);