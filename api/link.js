var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')

const crypto = require('crypto')
var nodemailer = require('nodemailer');
router.use(bodyParser.json());
var isAuthenticate = require('../middleware/auth')

const { body, validationResult } = require('express-validator');

const Link = require('../models/link');


var transporter = require('../plugins/mailer');
const redirect = require('../tools/template');
  
router.get('/home', function(req, res, next) { 
    res.json( {connection:{status:"OK",
    message:"Welcome to You in Link Page"}});
});


//add without signin
router.post('/add',(req,res)=>{
    let id= crypto.randomBytes(8).toString('hex');
    let code= crypto.randomBytes(6).toString('hex');
    let data = {
        
        origin_link : req.body.origin_link,
        new_link : code,
        id:id
    }
   
    const add = new Link(data)
    add.save().then(resp=>{
        res.status(200).json({data:{added:"yes",link:process.env.REDIRECT_LINK+code}})
    }).catch(err=>{
        res.status(404).json({data:{added:"no",message:err.message}})
    })
})

//add with signin
router.post('/add_s',isAuthenticate,(req,res)=>{

    let code= crypto.randomBytes(6).toString('hex');
    let id= crypto.randomBytes(8).toString('hex');
    let newlink = code

    let data = {
        id:id,
        id_user:req.body.id_user,
        origin_link : req.body.origin_link,
        new_link : newlink
    }

    const add = new Link(data)

    add.save().then(resp=>{
        res.status(200).json({data:{loggedas:req.user.fullname,added:"yes",link:process.env.REDIRECT_LINK+code}})
    }).catch(err=>{
        res.status(404).json({data:{added:"no",message:err.message}})
    })
})
//get the origin link
router.get('/r/:cle',(req,res)=>{
    let json  = req.headers
    console.log('postman-token' in json)
    let cle = req.params.cle

    const find = Link.findOne({new_link:cle}).then(resp=>{
        if (resp == null) {
            return res.status(404).json({data:{redirect:"",message:"404"}})
        }
        else {
            const update = Link.updateOne({new_link:cle},{$inc:{number_of_clic:1}}).then(resp=>{
                
            })

            let json = {data:{redirect:resp.origin_link,message:"200"}}
            res.send(redirect(resp.origin_link))
        }
    }).catch(err=>{
        res.json({Error:{Name_code:err.code,message:err.message}})
    })
    
})

//get links created by user  
router.post('/get_user',isAuthenticate,(req,res)=>{
    
    if (req.body.id_user == "" ||req.body.id_user ==  null) {
        return res.status(500).send("User id required")
    }
    let id_user  = req.body.id_user

    const find = Link.find({id_user:id_user}).then(resp=>{
        if (resp.length == 0) {
          res.status(404).json({data:{entry:resp,message:"not found"}})  
        }
        else{
            res.status(200).json({data:{entry:resp,message:""}})
        }
    }).catch(err=>{
        res.status(417).json({data:{added:"no",message:err.message}})
    })

})


router.post("/update",isAuthenticate,(req,res)=>{
    
    data = {new_link:req.body.new_link}
    const update = Link.updateOne({new_link:req.body.link},{$set:data}).then(resp=>{
        if (resp.matchedCount == 0) {
            res.json({data:{update:"no"}})
        }
        else{
             let redirect = process.env.REDIRECT_LINK + req.body.new_link
            res.json({data:{update:"yes",new_link:redirect}})
        }
    }).catch(err=>{
        res.send(err)}
        )
})
module.exports = router;