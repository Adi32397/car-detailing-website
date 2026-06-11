const API_BASE = 'http://localhost:3000/api';

// Helper to get headers
function getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    };
}

document.addEventListener('DOMContentLoaded', () => {
    // Auth Check
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!token || !user || user.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        window.location.href = 'login.html';
        return;
    }

    // Navigation
    const navItems = document.querySelectorAll('.nav-menu li[data-target]');
    const sections = document.querySelectorAll('.content-section');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove active classes
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));

            // Add active class to clicked item and target section
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Initial fetch
    fetchBookings();
    fetchMessages();
});

// Format Date helper
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
}

// --- BOOKINGS ---
async function fetchBookings() {
    try {
        const response = await fetch(`${API_BASE}/bookings`, { headers: getAuthHeaders() });
        if (!response.ok) {
            if (response.status === 401 || response.status === 403) window.location.href = 'login.html';
            return;
        }
        const bookings = await response.json();
        
        const tbody = document.getElementById('bookings-body');
        tbody.innerHTML = '';

        bookings.forEach(booking => {
            const tr = document.createElement('tr');
            
            // Status Options
            const statusOptions = ['Pending', 'Confirmed', 'Completed', 'Cancelled']
                .map(status => `<option value="${status}" ${booking.status === status ? 'selected' : ''}>${status}</option>`)
                .join('');

            tr.innerHTML = `
                <td>#${booking.booking_id}</td>
                <td>
                    <strong>${booking.name}</strong><br>
                </td>
                <td>
                    <small>${booking.email}</small><br>
                    <small>${booking.phone}</small>
                </td>
                <td>${booking.vehicle_type}</td>
                <td>${booking.service_type}</td>
                <td>${formatDate(booking.booking_date)}</td>
                <td>
                    <select class="status-select" onchange="updateBookingStatus(${booking.booking_id}, this.value)">
                        ${statusOptions}
                    </select>
                </td>
                <td>
                    <button class="btn btn-delete" onclick="deleteBooking(${booking.booking_id})"><i class="fa-solid fa-trash"></i> Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching bookings:', error);
    }
}

async function updateBookingStatus(id, newStatus) {
    try {
        const response = await fetch(`${API_BASE}/bookings/${id}/status`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ status: newStatus })
        });
        
        if (response.ok) {
            console.log('Status updated');
        } else {
            alert('Failed to update status');
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
}

async function deleteBooking(id) {
    if (confirm('Are you sure you want to delete this booking?')) {
        try {
            const response = await fetch(`${API_BASE}/bookings/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            
            if (response.ok) {
                fetchBookings();
            } else {
                alert('Failed to delete booking');
            }
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    }
}

// --- MESSAGES ---
async function fetchMessages() {
    try {
        const response = await fetch(`${API_BASE}/contacts`, { headers: getAuthHeaders() });
        if (!response.ok) return;
        const messages = await response.json();
        
        const tbody = document.getElementById('messages-body');
        tbody.innerHTML = '';

        messages.forEach(msg => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>#${msg.contact_id}</td>
                <td>${msg.name}</td>
                <td>${msg.email}</td>
                <td><p style="max-width: 300px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" title="${msg.message}">${msg.message}</p></td>
                <td>${formatDate(msg.created_at)}</td>
                <td>
                    <button class="btn btn-delete" onclick="deleteMessage(${msg.contact_id})"><i class="fa-solid fa-trash"></i> Delete</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (error) {
        console.error('Error fetching messages:', error);
    }
}

async function deleteMessage(id) {
    if (confirm('Are you sure you want to delete this message?')) {
        try {
            const response = await fetch(`${API_BASE}/contacts/${id}`, {
                method: 'DELETE',
                headers: getAuthHeaders()
            });
            
            if (response.ok) {
                fetchMessages();
            } else {
                alert('Failed to delete message');
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    }
}
