const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const createUser = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });

        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'Este usuario ya existe.',
            })
        }

        user = new User(req.body);

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        res.status(201).json({
            ok: true,
            id: user.id,
            name: user.name,
        });
    } catch (e) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
        console.log(e);
    }
}

const loginUSer = (req, res = response) => {
    const { email, password } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'login',
        email,
        password,
    });
}

const revalidateToken = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'renew'
    });
}

module.exports = {
    createUser,
    loginUSer,
    revalidateToken,

};