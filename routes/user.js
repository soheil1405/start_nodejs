const express = require('express');
let users = require('../users');
// const users = require('../users');
const router = express.Router();


router.get('/' , (req , res)=>{

    
    // res.status(200).json({
//     data : users , 
    //     success : true

    // })
    
     msg = req.flash('msg');


    res.render('users' , {users, title : "همه کاربران" , msg});
});

router.get('/:id' , (req , res)=>{
    let user = users.find(user=>{
        if(user.id == req.params.id){
            return user;
        }
    })
    
    // if(thisuser){

    //     res.status(200).json({
    //         data : thisuser  ,
    //         success : true ,
    //      });

    // }else{
        
    //     res.status(404).json({
    //         data : {}  ,
    //         massage : "user not fount" ,
    //         success : false ,
    //      });
    // }

    
    console.log(req.flash('msg'));

    return res.render('user' , {user ,  msg : req.flash('msg')} );

});

router.post('/save' ,

// [
//     check('email' , 'فرمت ایمیل صحیح نیست' ).isEmail() ,
//     check('password' , 'مقدار پسورد حداقل باید ۵ کاراکتر باشد').isLength({min : 5}) 
// ] ,

(req , res)=>{


    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     return res.status(422).json(errors.array());
    // }

    console.log(req.body);
    users.push(req.body);
    // res.json({
    //     massage : "user added successfully" ,
    //     success : true
    // });
    req.flash('msg' , 'کاربر با موفقیت دخبره شد');

    return res.redirect('/user/')

});

router.delete('/delete/:id' , (req , res)=>{
    

     users = users.filter(user=>{

        if(user.id != req.params.id){
            return user ;
        }
    });
    

    req.flash('msg' , 'کاربر با موفقیت حذف شد');
    return res.redirect('/user/' );
    
    
});

router.put('/:id' , (req , res)=>{

    
users = users.map(user=>{

        if(user.id == req.params.id){
            return req.body;
        }else{
            return user;
        }
    });

    // res.json({
    //     massage : "کاربر با موفقیت بروزرسانی شد" ,
    //     success : true
    // });

     
    req.flash('msg' , 'کاربر با موفقیت بروزرسانی شد');

    return res.redirect('/user/' );
});




module.exports = router;