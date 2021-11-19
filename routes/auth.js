/**
 * Rutas de usuarios /Auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { createUser, loginUSer, revalidateToken } = require('../controllers/auth');
const router = Router();

router.post(
    "/new", 
    [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ], 
    createUser
);

router.post(
    "/", 
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    ],
    loginUSer);

router.get("/renew", revalidateToken);

module.exports = router;