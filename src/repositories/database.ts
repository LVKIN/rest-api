import sqlite3 from 'sqlite3';

const DBSOURCE = 'db.sqlite'

const SQL_ITEMS_CREATE = `
    CREATE TABLE IF NOT EXISTS ITEMS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        description TEXT
    )
`;

const database = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Database connection successful')
        database.run(SQL_ITEMS_CREATE, (err) => {
            if (err) {
                console.log('An error has occurred, validate if this table was created...');
            } else {
                console.log('Table created successful');
            }
        })
    }
})

export default database;