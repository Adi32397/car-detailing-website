const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const path = require('path');
const fs = require('fs');

let dbInstance = null;

async function getDb() {
    if (dbInstance) return dbInstance;
    
    dbInstance = await open({
        filename: path.join(__dirname, 'database.sqlite'),
        driver: sqlite3.Database
    });

    // Initialize database if empty
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    if (fs.existsSync(schemaPath)) {
        const schema = fs.readFileSync(schemaPath, 'utf8');
        await dbInstance.exec(schema);
    }
    
    return dbInstance;
}

// Export a wrapper that mimics mysql2/promise `pool.query`
module.exports = {
    query: async (sql, params = []) => {
        const db = await getDb();
        if (sql.trim().toUpperCase().startsWith('SELECT')) {
            const rows = await db.all(sql, params);
            return [rows]; // Wrap in array to mimic mysql2's [rows, fields] return
        } else {
            const result = await db.run(sql, params);
            // result in sqlite has lastID and changes. mysql2 result has insertId and affectedRows.
            return [{ insertId: result.lastID, affectedRows: result.changes }];
        }
    }
};
