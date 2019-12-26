const router = require('express').Router();

let User = require('../models/user.model');

router.route('/').get((req,res)=>{
User.find()
.then(users => res.json(users))
.catch(err => res.status(400).json("Error :: "+ err));
});


router.route('/add').post((req,res)=>{

    const username =req.body.userName;
    const newUser = new User({userName:username});
    

    newUser.save().then(
        () =>{
            res.json("User Added");

        }
    ).catch(
        (err) => {

            res.status(400).json(err);
        }
    );
});

module.exports = router;