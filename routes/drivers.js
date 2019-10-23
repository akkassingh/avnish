var express = require('express');
var router = express.Router();
let models = require("../models");
const { Validator, ValidationError } = require('express-json-validator-middleware');
const validator = new Validator({allErrors: true});
const validate = validator.validate;



router.get('/', function(req, res, next) {
  
    models.Driver.findAll().then(function(result){res.send(result)}).catch(function(err){res.send(err)})
  });


 router.post('/',async function(req,res,next){
  

try{
    let driver = await models.Driver.create(req.body);
    res.send(driver);
}catch(exception){
  res.send(new Error(exception));
}
  


 }); 


 router.put('/',async function(req,res,next){
   try{
    let driver = await models.Driver.findOne(req.params.id);
    console.log("************d************");
    if(!driver){
      console.log("************************");
      throw new Error('No driver with this id');
    }
    console.log(driver);

   }catch(exception){
     console.log(exception)
     res.send(exception);
   }
 })





module.exports = router;
