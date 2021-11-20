/**
 * Event Routes
 * /api/events
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/fields-validator');
const { getEvents, createEvents, updateEvent, deleteEvent } = require('../controllers/events');
const { validateJWT } = require('../middlewares/validate-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();
router.use(validateJWT);

router.get(
    '/', 
    getEvents
);

router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'La fecha de inicio es obligatoria').custom(isDate),
        check('end', 'La fecha de inicio es obligatoria').custom(isDate),
        validateFields,
    ],
    createEvents
);

router.put(
    '/:id', 
    updateEvent
);

router.delete(
    '/:id',
    deleteEvent
);

module.exports = router;