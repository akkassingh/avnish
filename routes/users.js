const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = "secret";
const {
    check,
    validationResult
} = require('express-validator');

let models = require("../models");

const accessTypes = ['SUPER ADMIN', 'ADMIN', 'USER']


// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
    '/',
    [
        check('name', 'Name is required')
        .not()
        .isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check(
            'password',
            'Please enter a password with 6 or more characters'
        ).isLength({
            min: 6
        }),
        check('accessType', 'accessType is required')
        .not()
        .isEmpty()
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const {
            name,
            email,
            password,
            accessType
        } = req.body;

        try {
            let user = await models.users.findOne({where: {email}});
            if (user) {
                return res
                    .status(400)
                    .json({
                        errors: [{
                            msg: 'User already exists'
                        }]
                    });
            }
            user = new models.users({
                name,
                email,
                password,
                username: email,
                accessType: accessType.toUpperCase()
            });
            if(accessTypes.includes(user.accessType) == 'false'){
                return res
                .status(400)
                .json({
                    errors: [{
                        msg: 'Access type is invalid'
                    }]
                });
            }
            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

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