const express = require('express');
const signUpController = require('../controller/signup');
const signInController = require('../controller/signin');
const dashboardController = require('../controller/dashboard');
const movieController = require('../controller/movie');

const router = express.Router();

router.get('/signin', (req, res) => {
    res.render('signin');
})
router.post('/signin', signInController.signIn);

router.get('/signup', (req, res) => {
    res.render('signup');
})
router.post('/signup', signUpController.signUp);

router.get("/apikey", movieController.apiKey);

router.get('/dashboard', (req, res) => {
    const userName = "";
    res.render('dashboard', { user: userName });
})
router.post('/dashboard', dashboardController.dashboard);

module.exports = router;
