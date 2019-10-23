var express = require('express');
var router = express.Router();
const sequelise=require("sequelize");
const models =  require("../models")


/* GET home page. */

router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  return models.Driver.findAll()
});

module.exports = router;
