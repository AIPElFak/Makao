import express from 'express';
import Games from '../Redis/Games';
import Gameplay from '../Gameplay/Gameplay';

var router = express.Router();

router.post('/game/create', (req, res, next) => {
    let creator = req.user.username;
    let rules = req.body.rules;

    Gameplay.createGame(creator, rules)
        .then(() => res.status(200).json({success: true}))
        .catch((reason) => res.status(200).json({success: false, reason: reason}));
});

router.post('/game/state', (req, res, next) => {
    Gameplay.getGameStatus(req.body.creatorUsername)
        .then((state) => res.status(200).json({state: state}))
        .catch((reason) => res.status(200).json({success: false, reason: reason}));
});

router.post('/game/watch', (req, res, next) => {
    Gameplay.getGame(req.body.creatorUsername)
        .then((state) => res.status(200).json({state: state}))
        .catch((reason) => res.status(200).json({success: false, reason: reason}));
});

module.exports = router;