/**
 * Event Routes
 * /api/events
 */

const { Router } = require('express');
const { getEvents, createEvents, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt')

const router = Router();
router.use(validateJWT);

router.get('/', getEvents);

router.post('/', createEvents);

router.put('/:id', updateEvent);

router.delete('/:id', deleteEvent);

module.exports = router;