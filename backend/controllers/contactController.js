const pool = require('../db');

exports.submitContact = async (req, res) => {
    const { name, email, message } = req.body;
    
    try {
        const [result] = await pool.query(
            'INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)',
            [name, email, message]
        );
        res.status(201).json({ message: 'Message sent successfully', contact_id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to send message' });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const [contacts] = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
        res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
};

exports.deleteContact = async (req, res) => {
    const { id } = req.params;
    
    try {
        await pool.query('DELETE FROM contacts WHERE contact_id = ?', [id]);
        res.status(200).json({ message: 'Contact message deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete contact message' });
    }
};
