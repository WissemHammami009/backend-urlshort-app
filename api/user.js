var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
const crypto = require('crypto')
var transporter = require('../plugins/mailer')
router.use(bodyParser.json());

const User = require('../models/user');

var assert = require('assert');

router.get('/home', function(req, res, next) { 
    res.json( {connection:{status:"OK",
    message:"Welcome to You in Home Page"}});
});

router.post('/add',async (req,res)=>{
    let hash = crypto.createHash('md5').update(req.body.password).digest("hex")
    let resets_id = crypto.randomBytes(50).toString('hex');
    let code_confirm = crypto.randomBytes(30).toString('hex');
    let id_pass = crypto.randomBytes(20).toString('hex');
    const id  = req.body.id;
    const user = new User(
        {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: hash,
        reset_id_bs:resets_id,
        code_confirm:code_confirm,
        id_pass:id_pass
        }
    )
    const mail = req.body.email;
    const link = "http://localhost:4200/confirm/"+code_confirm;
        var html = '<body style="width:100%;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0"><div class="es-wrapper-color" style="background-color:#F4F4F4"><!--[if gte mso 9]><v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t"> <v:fill type="tile" color="#f4f4f4"></v:fill> </v:background><![endif]--><table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top"><tr class="gmail-fix" height="0" style="border-collapse:collapse"><td style="padding:0;Margin:0"><table cellspacing="0" cellpadding="0" border="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:600px"><tr style="border-collapse:collapse"><td cellpadding="0" cellspacing="0" border="0" style="padding:0;Margin:0;line-height:1px;min-width:600px" height="0"><img src="https://veoxxq.stripocdn.email/content/guids/CABINET_837dc1d79e3a5eca5eb1609bfe9fd374/images/41521605538834349.png" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic;max-height:0px;min-height:0px;min-width:600px;width:600px" alt width="600" height="1"></td></tr></table></td>'
        html += '</tr><tr style="border-collapse:collapse"><td valign="top" style="padding:0;Margin:0"><table cellpadding="0" cellspacing="0" class="es-content" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:282px" valign="top"><![endif]--><table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0;width:282px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td class="es-infoblock es-m-txt-c" align="left" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, \'helvetica\ neue\', helvetica, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"> <br></p>'
        html += '</td></tr></table></td></tr></table><!--[if mso]></td><td style="width:20px"></td>'
        html += '<td style="width:278px" valign="top"><![endif]--><table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0;width:278px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="right" class="es-infoblock es-m-txt-c" style="padding:0;Margin:0;line-height:14px;font-size:12px;color:#CCCCCC"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:14px;color:#CCCCCC;font-size:12px"><a href="http://localhost/4200" class="view" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#CCCCCC;font-size:12px;font-family:arial, \'helvetica neue\', helvetica, sans-serif">  </a></p>'
        html += '</td></tr></table></td></tr></table><!--[if mso]></td></tr></table><![endif]--></td></tr></table></td>'
        html += '</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:4px;background-color:#ffffff" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff" role="presentation"><tr style="border-collapse:collapse"><td class="es-m-txt-l" bgcolor="#ffffff" align="left" style="Margin:0;padding-top:20px;padding-bottom:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">We\'re excited to have you get started. First, you need to confirm your account. Just press the button below.</p>'
        html += '</td></tr><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-left:10px;padding-right:10px;padding-top:35px;padding-bottom:35px"><span class="es-button-border" style="border-style:solid;border-color:#FFA73B;background:1px;border-width:1px;display:inline-block;border-radius:2px;width:auto"><a href="'+link+'" class="es-button es-button-1" target="_blank" style="mso-style-priority:100 !important;text-decoration:none;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;color:#FFFFFF;font-size:20px;border-style:solid;border-color:#FFA73B;border-width:15px 30px;display:inline-block;background:#FFA73B;border-radius:2px;font-family:helvetica, \'helvetica neue\', arial, verdana, sans-serif;font-weight:normal;font-style:normal;line-height:24px;width:auto;text-align:center"> Confirm Account</a></span></td>'
        html += '</tr><tr style="border-collapse:collapse"><td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">If that doesn\'t work, copy and paste the following link in your browser:</p></td></tr><tr style="border-collapse:collapse"><td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><a target="_blank" href="'+link+'" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#FFA73B;font-size:18px">'+code_confirm+'</a></td>'
        html += '</tr><tr style="border-collapse:collapse"><td class="es-m-txt-l" align="left" style="padding:0;Margin:0;padding-top:20px;padding-left:30px;padding-right:30px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">If you have any questions, just reply to this email—we\'re always happy to help out.</p></td></tr><tr style="border-collapse:collapse"><td class="es-m-txt-l" align="left" style="Margin:0;padding-top:20px;padding-left:30px;padding-right:30px;padding-bottom:40px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">Cheers,</p>'
        html += '<p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:lato, \'helvetica neue\', helvetica, arial, sans-serif;line-height:27px;color:#666666;font-size:18px">Your password Manager Team</p></td></tr></table></td></tr></table></td></tr></table></td>'
        html += '</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="padding:0;Margin:0"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:600px"><table width="100%" cellspacing="0" cellpadding="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px;font-size:0"><table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" role="presentation" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td style="padding:0;Margin:0;border-bottom:1px solid #f4f4f4;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>'
        html += '</tr></table></td></tr></table></td></tr></table></td></tr></table></td>'
        html += '</tr></table><table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0"><table class="es-content-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:transparent;width:600px" cellspacing="0" cellpadding="0" align="center"><tr style="border-collapse:collapse"><td align="left" style="Margin:0;padding-left:20px;padding-right:20px;padding-top:30px;padding-bottom:30px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td valign="top" align="center" style="padding:0;Margin:0;width:560px"><table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px"><tr style="border-collapse:collapse"><td align="center" style="padding:0;Margin:0;display:none"></td>'
        html += '</tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr></table></div></body></html>'

    var mailOptions = {
        from: 'Your Password Manager <password-manager@gmail.com>',
        to: mail,
        subject: 'Confirmation de votre compte',
        html: html
      };
    const find = User.findOne({email:req.body.email}).then(resp=>{
        if (resp ==null) {
            user.save()
            .then(resp=>{
                  transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                      console.log(error);
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                      }
                  });
                res.json(
                    {signup: {
                    added:"yes",
                    check:"yes",
                    email:"not exist"
                }}
                )
            })

            .catch(err=>{
                res.send(err.message)
            })
        }
        else {
        res.json(
            {signup:{
            added:"no",
            check: "no",
            email:"exist"}
            }
        )
        }
    
})
})

//authentification
router.post('/login',(req,res)=>{
    let hash = crypto.createHash('md5').update(req.body.password).digest("hex")
    const data = {
        email:req.body.email,
        password:hash
    }
const getdata = User.findOne(data)
.then(resp=>{
    if (resp ==null) {
        return res.json({login: {
            email:req.body.email,
            check:false,
            message:"Authentication failed"
        }})
    }
    if (resp.confirm == "no") {
        return res.json({login:{
            confirm:"no"
        }})
        
    }
    res.status(200).json({login: {
        cin:req.body.cin,
        check:true,
        message:"Authentification Granted",
        name: resp.name +" "+ resp.surname,
        id:resp._id
    }})
    
})
.catch(err=>{
    res.send(err)
})
})

//confirm email
router.patch('/confirm/:cle',(req,res)=>{
    const cle = req.params.cle;
    const data = {
        code_confirm: req.params.cle
    }
    const find = User.findOne(data).then(resp=>{
        if(resp != null){
            const update = User.updateOne({
                code_confirm:cle
            },{
                $set: {code_confirm:null,
                        confirm:"yes"}
            }).then(resp=>{res.json(
                {
                    confirm:{confirm:"yes",code:"valid"}
                })
            })
        }
        else {
                res.json(
                    {confirm:{confirm:"no",code:"invalid"}}
                    )
        }
    }).catch(err=>req.send(err))
})

router.post('/data',(req,res)=>{
    let data = {id: req.body.id}
    const find = User.findOne(data).then(resp=>{
        res.json({data:{name:resp.name, surname:resp.surname,email:resp.email}})
    })
})




//update profile 
router.patch('/updateprofile',(req,res)=>{
    const id  = req.body.id;
    const data = {
        email:req.body.email
    }
    delete req.body.id
    if (req.body.email == null) {
        const update  = User.updateOne({_id:id},{$set: req.body}).then(resp=>{
            if(resp.matchedCount == 0){
             res.json({data:{update:"no"}})
            }
            else {
                res.json({data:{update:"yes"}})
            }
        }).catch(err=>{
            res.send(err)}
            )
    }
    else {
        const find = User.findOne(data).then(resp=>{
            if (resp ==null) {
                const update  = User.updateOne({_id:id},{$set: req.body}).then(resp=>{
                    if(resp.matchedCount == 0){
                    res.json({data:{update:"no",message:"404"}})
                    }
                    else {
                        res.json({data:{update:"yes",message:"ok"}})
                    }
                })
            }
            else {
            res.json({data:{update:"no",message:"exist"}})
            }
        })
    
        .catch(err=>{
            res.send(err)
        })
    }
   
})

//update password 
router.patch('/updatepassword',(req,res)=>{
    let hash = crypto.createHash('md5').update(req.body.newpassword).digest("hex")
    let old_pass = crypto.createHash('md5').update(req.body.password).digest("hex")
    const id  = req.body.id;
    data = {
        _id:id,
        password:old_pass
    }
    const find = User.findOne(data).then(resp=>{
        if (resp != null) {
            const update = User.updateOne({
                _id:id
            },{
                $set: {password:hash}
            })
            .then(resp=>{
                res.json(
                    {updated: {
                    password:"yes",message:"ok"}})
            })
            .catch(err=>{
                res.send(err)
            })
        }
        else{
            res.json(
                {updated: {
                password:"no",message:"wrongpass"}})
        }
    }).catch(err=>{
        res.send(err)
    })
})

module.exports = router;