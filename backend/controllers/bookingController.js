const pool = require('../db');

exports.createBooking = async (req, res) => {
    const { name, email, phone, vehicle_type, service_type, booking_date, special_instructions } = req.body;
    
    try {
        // 1. Check if customer exists by email, if not create them
        let [customers] = await pool.query('SELECT customer_id FROM customers WHERE email = ?', [email]);
        let customer_id;
        
        if (customers.length > 0) {
            customer_id = customers[0].customer_id;
        } else {
            const [result] = await pool.query(
                'INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)',
                [name, email, phone]
            );
            customer_id = result.insertId;
        }

        // 2. Insert booking
        const user_id = req.user ? req.user.user_id : null;
        
        const [bookingResult] = await pool.query(
            'INSERT INTO bookings (customer_id, user_id, vehicle_type, service_type, booking_date, special_instructions) VALUES (?, ?, ?, ?, ?, ?)',
            [customer_id, user_id, vehicle_type, service_type, booking_date, special_instructions]
        );

        res.status(201).json({ message: 'Booking created successfully', booking_id: bookingResult.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create booking' });
    }
};

exports.getAllBookings = async (req, res) => {
    try {
        const query = `
            SELECT b.booking_id, c.name, c.email, c.phone, b.vehicle_type, b.service_type, b.booking_date, b.status, b.special_instructions 
            FROM bookings b
            JOIN customers c ON b.customer_id = c.customer_id
            ORDER BY b.booking_date DESC
        `;
        const [bookings] = await pool.query(query);
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

exports.updateBookingStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    try {
        await pool.query('UPDATE bookings SET status = ? WHERE booking_id = ?', [status, id]);
        res.status(200).json({ message: 'Booking status updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update booking status' });
    }
};

exports.deleteBooking = async (req, res) => {
    const { id } = req.params;
    
    try {
        await pool.query('DELETE FROM bookings WHERE booking_id = ?', [id]);
        res.status(200).json({ message: 'Booking deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete booking' });
    }
};
