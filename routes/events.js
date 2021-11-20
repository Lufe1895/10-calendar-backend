const { Router } = require('express');

const router = Router();

router.get('/', getEvents);

router.post('/', createEvents);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);