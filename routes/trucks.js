var express = require('express');
var router = express.Router();
let models = require("../models");
const auth = require('../middleware/auth');
const {
  check,
  validationResult
} = require('express-validator');

// @route    POST /trucks
// @desc     Register Truck
// @access   Private

router.post(
  '/', [
    [
      auth,
      check(
        'vehicleNumber',
        'vehicleNumber is required'
      ).exists()
    ]
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    try {
      let user = await models.users.findOne({where: {id: req.user.id}});
      if (user && user.accessType !== 'SUPER ADMIN') {
          return res
              .status(400)
              .json({
                  errors: [{
                      msg: 'User does not have access'
                  }]
              });
      }
      let Truck = await models.Truck.create(req.body);
      res.send(Truck);
    } catch (exception) {
      res.send(new Error(exception));
    }
  });

// @route    GET /trucks/:id
// @desc     get Truck data
// @access   Private
router.get(
  '/:id', [
    [
      auth,
      check(
        'id',
        'id is required'
      ).exists()
    ]
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    try {
      let Truck = await models.Truck.findOne({
        id: req.params.id
      });
      if (!Truck) {
        throw new Error('No Truck with this id');
      } else {
        res.send(Truck);
      }
    } catch (exception) {
      res.send(exception);
    }
  })

// @route    PUT /trucks
// @desc     Update Truck data
// @access   Private

router.put(
  '/', [
    [
      auth,
      check('vehicleNumber', 'vehicleNumber is required').exists(),
      check(
        'id',
        'id is required'
      ).exists()
    ]
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    try {
      if (user && user.accessType !== 'SUPER ADMIN') {
        return res
            .status(400)
            .json({
                errors: [{
                    msg: 'User does not have access'
                }]
            });
    }
      let Truck = await models.Truck.findOne({
        id: req.body.id
      });
      if (!Truck) {
        throw new Error('No Truck with this id');
      }
      try {
        let newTruck = await models.Truck.update({
          vehicleNumber: req.body.vehicleNumber
        }, {
          where: {
            id: Truck.dataValues.id
          }
        });
        res.send(newTruck);
      } catch (exception) {
        res.send(new Error(exception));
      }
    } catch (exception) {
      res.send(exception);
    }
  })

// @route    DELETE /trucks/:id
// @desc     delete Truck data
// @access   Private

router.delete(
  '/:id', [
    [
      auth,
      check(
        'id',
        'id is required'
      ).exists()
    ]
  ],
  async function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array()
      });
    }
    try {
      if (user && user.accessType !== 'SUPER ADMIN') {
        return res
            .status(400)
            .json({
                errors: [{
                    msg: 'User does not have access'
                }]
            });
    }
      let Truck = await models.Truck.findOne({
        id: req.params.id
      });
      if (!Truck) {
        throw new Error('No Truck with this id');
      }
      await Truck.destroy()
      res.json({
        msg: 'Truck removed'
      });
    } catch (exception) {
      res.send(exception);
    }
  })

module.exports = router;