const { response } = require('express');

const getEvents = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'getEvents',
    })
}

const createEvents = (req, res = response) => {
    console.log(req.body);
    res.json({
        ok: true,
        msg: 'createEvents',
    })
}
const updateEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'updateEvent',
    })
}
const deleteEvent = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteEvent',
    })
}

module.exports = {
    getEvents,
    createEvents,
    updateEvent,
    deleteEvent,
}