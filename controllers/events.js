const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async(req, res = response) => {
    try {
        const events = await Event.find().populate('user', 'name');
        res.status(200).json({
            ok: true,
            events,
        })
    } catch(e) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
}

const createEvents = async(req, res = response) => {
    const event = new Event(req.body);
    try {
        event.user = req.uid;
        const savedEvent = await event.save();
        res.status(201).json({
            ok: true,
            event: savedEvent,
        })
    } catch(e) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador.',
        })
    } 
    
}
const updateEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if(!event) {
            res.status(404).json({
                ok: false,
                msg: 'Este evento no existe',
            });
        }
        if(event.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'No puede editar este evento',
            });
        }
        const newEvent = {
            ...req.body,
            user: uid,
        }
        const updatedEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });
        res.status(200).json({
            ok: true,
            event: updatedEvent,
        })
    } catch(e) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
}
const deleteEvent = async(req, res = response) => {
    const eventId = req.params.id;
    const uid = req.uid;
    try {
        const event = await Event.findById(eventId);
        if(!event) {
            res.status(404).json({
                ok: false,
                msg: 'Este evento no existe',
            });
        }
        if(event.user.toString() !== uid) {
            res.status(401).json({
                ok: false,
                msg: 'No puede eliminar este evento',
            });
        }
        await Event.findByIdAndDelete(eventId);
        res.status(200).json({
            ok: true,
        })
    } catch(e) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador',
        });
    }
}

module.exports = {
    getEvents,
    createEvents,
    updateEvent,
    deleteEvent,
}