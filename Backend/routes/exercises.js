const router = require('express').Router();

let Exercise = require('../models/exercise.model');

router.route('/').get((req,res)=>{
    Exercise.find()
.then(exercises => res.json(exercises))
.catch(err => res.status(400).json("Error :: "+ err));
});


router.route('/add').post((req,res)=>{

    
    const newExercise = new Exercise(
{
    userName : req.body.userName,
    password : req.body.password,
    description : req.body.description,
    date : req.body.date
}

    );

    newExercise.save().then(
        () =>{
            res.json("Exercise Added");

        }
    ).catch(
        (err) => {

            res.status(400).json(err);
        }
    );
});
router.route('/:id').get((req,res)=>{
    
       Exercise.findById(req.params.id)
       .then((exercise) => res.json(exercise))
       .catch((err)=> res.status(404).json(err));
    });
router.route('/:id').delete((req,res)=>{
        
           Exercise.findByIdAndDelete(req.params.id)
           .then((exercise) => res.json(exercise))
           .catch((err)=> res.status(404).json(err));
});
router.route('/update/:id').post((req,res)=>{
    
       Exercise.findById(req.params.id)
       .then((exercise) => {
        exercise.userName = req.body.userName;
        exercise.password = req.body.password;
        exercise.description = req.body.description;
        exercise.date = req.body.date;

        exercise.save()
        .then(()=>res.json("updated successfully"))
        .catch(err => res.status(406).json(err));
       })
       .catch((err)=> res.status(405).json(err));
    });

module.exports = router;