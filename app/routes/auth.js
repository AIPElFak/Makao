import express from 'express';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import { loginAuth, signupAuth } from '../auth-check';

var router = express.Router();

// TODO - add complexity package for password validationResult
// TODO - add username alphanumeric validation with validator

function validateLoginForm(data) {
    var error = '';
    var isValid = true;

    if (!data || typeof data.email !== 'string' || data.email.trim().length === 0) {
        isValid = false;
        error = 'Email is required.';
    } else if (!data || typeof data.password !== 'string' || data.password.trim().length === 0) {
        isValid = false;
        error = 'Password is required.';
    }

    return {
        success: isValid,
        error: error
    }
}

function validateSignupForm(data) {
    var error = '';
    let isValid = true;

    if (!data || typeof data.username !== 'string' || data.username.trim().length < 3) {
        isValid = false;
        error = 'Username with at least 3 alphanumeric characters is required.';
    } else if (!data || typeof data.email !== 'string' || !validator.isEmail(data.email)) {
        isValid = false;
        error = 'Valid email address is required.';
    } else if (!data || typeof data.password !== 'string' || data.password.trim().length < 8) {
        isValid = false;
        error = 'Password with at least 8 characters is required.';
    } else if (!data || typeof data.confirmPassword !== 'string' || data.confirmPassword.trim() !== data.password.trim()) {
        isValid = false;
        error = 'Inserted passwords do not match.';
    }

    return {
        success: isValid,
        error: error
    };
}

// POST login request
router.post('/login', (req, res, next) => {
    // first we validate the input fields
    var validationResult = validateLoginForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.error
        });
    }

    // if inputs are valid, we authenticate the user
    // by sending him a JSON web token (jwt)
    loginAuth(req.body, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        var payload = { sub: user.id, name: user.username };
        // create a JSON web token
        var token = jwt.sign(payload, 'aips2017jajacmasamitic');

        return res.status(200).json({
            success: true,
            message: "Successful login!",
            token
        });
    })
});

// POST signup request
router.post('/signup', (req, res, next) => {
    // first we validate the input fields
    var validationResult = validateSignupForm(req.body);
    if (!validationResult.success) {
        return res.status(400).json({
            success: false,
            message: validationResult.error
        });
    }

    // if inputs are valid, we register the user
    // and send him a jwt
    signupAuth(req.body, (err, user) => {
        if (err) {
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }

        var payload = { sub: user.id, name: user.username };
        // create a JSON web token
        var token = jwt.sign(payload, 'aips2017jajacmasamitic');

        return res.status(200).json({
            success: true,
            message: "Successful signup!",
            token
        });
    })
});

module.exports = router;