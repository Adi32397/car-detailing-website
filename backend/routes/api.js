const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const contactController = require('../controllers/contactController');
const authController = require('../controllers/authController');
const { verifyToken, requireAdmin } = require('../middleware/authMiddleware');

// Auth Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Booking Routes (verifyToken is optional for creation to allow guests, but required to attach user_id)
router.post('/bookings', verifyToken, bookingController.createBooking);
router.get('/bookings', requireAdmin, bookingController.getAllBookings);
router.put('/bookings/:id/status', requireAdmin, bookingController.updateBookingStatus);
router.delete('/bookings/:id', requireAdmin, bookingController.deleteBooking);

// Contact Routes
router.post('/contacts', contactController.submitContact);
router.get('/contacts', requireAdmin, contactController.getAllContacts);
router.delete('/contacts/:id', requireAdmin, contactController.deleteContact);

module.exports = router;
