const { Validator, ValidationError } = require('express-json-validator-middleware');
const validator = new Validator({allErrors: true});
const validate = validator.validate;
const 
export default class validatorFactory
{

    getValidator(type){
        let json = {validate:validate,schema:null};
        switch(type){
            case "":



        }




    }

    
}