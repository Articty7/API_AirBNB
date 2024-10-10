const express = require('express');
const { Op } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { SpotImage } = require('../../db/models');

const router = express.Router();

// Routes Here

const validateBooking = [
    check('spotId')
    .exists({ checkFalsy: true })
    .isInt()
    .withMessage('Spot ID must be a valid integer.'),
    check('startDate')
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage('Start date must be a valid date.'),
    check('endDate')
    .exists({ checkFalsy: true })
    .isDate()
    .withMessage('End date must be a valid date.'),
    handleValidationErrors,
];

//Create new Booking

router.post ('/', validateBooking, async (req, res) => {
    const { spotId, startDate, endDate } = req.body;
    const userId = req.user.id;

    const newBooking = await Booking.create({
        spotId,
        userId,
        startDate,
        endDate,
    });

    return res.status(201).json(newBooking);
});

//Get current user's bookings

router.get('/current', restoreUser, async (req, res) => {
    const userId = req.user.id;
  const bookings = await Booking.findAll({
    where: { userId },
    include: [{ model: Spot }],
  });
  return res.json(bookings);
});

// Delete a booking by ID
router.delete('/:id', restoreUser, async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findByPk(id);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    await booking.destroy();
    return res.status(204).send();
  });

module.exports = router;
