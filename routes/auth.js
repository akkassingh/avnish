const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
let models = require("../models");
const {
    check,
    validationResult
} = require('express-validator');
const jwtSecret = "secret";

// router.get('/', auth, async (req, res) => {
//     try {
//         let user = await models.users.findOne({id: req.user.id});
//         // let user = await models.users.findOne({
//         //     attributes: { exclude: ['password'] }
//         //   }); 
//         res.json(user);
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Server Error');
//     }
// });


// @route    POST auth/users
// @desc     Authenticate user & get token
// @access   Public
router.post(
    '/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Password is required'
        ).exists()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            email,
            password
        } = req.body;

        try {
            let user = await models.users.findOne({
                email
            });

            if (!user) {
                return res
                    .status(400)
                    .json({
                        errors: [{
                            msg: 'Invalid Credentials'
                        }]
                    });
            }

            const isMatch = await bcrypt.compare(password,user.password);
            if(!isMatch){
                return res .status(400).json({
                    errors: [{
                        msg: 'Invalid Credentials'
                    }]
                })
            }
             
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                jwtSecret, {
                    expiresIn: 360000
                },
                (err, token) => {
                    if (err) throw err;
                    res.json({
                        token
                    });
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);


module.exports = router;
