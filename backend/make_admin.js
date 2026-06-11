const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const bcrypt = require('bcrypt');

async function makeAdmin() {
    const db = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });

    // Update all existing users to admin
    await db.run("UPDATE users SET role = 'admin'");
    console.log("All existing users have been granted admin privileges.");

    // Check if an admin user specifically exists
    const adminExists = await db.get("SELECT * FROM users WHERE email = 'admin@eliteautocare.com'");
    if (!adminExists) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await db.run(
            "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)",
            ['Administrator', 'admin@eliteautocare.com', hashedPassword, 'admin']
        );
        console.log("Created a default admin user: email: admin@eliteautocare.com, password: admin123");
    }

    console.log("Done.");
}

makeAdmin();
