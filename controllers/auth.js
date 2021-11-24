const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt')

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

const loginUSer = async(req, res = response) => {
    const { email, password } = req.body;

    try{
        let user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Este usuario no existe.',
            })
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña incorrecta.',
            })
        }

        const token = await generateJWT(user.id, user.name);

        res.json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        })
    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        })
    }
}

const revalidateToken = async(req, res = response) => {
    const { uid, name } = req;

    const token = await generateJWT(uid, name);

    res.json({
        ok: true,
        token,
        uid, 
        name,
    });
}

module.exports = {
    createUser,
    loginUSer,
    revalidateToken,

};