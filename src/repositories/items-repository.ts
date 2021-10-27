import Item from "../models/item";
import database from "./database";

const itemsRepository = {
    create: (item: Item, callback: (id?: number) => void) => {
        const sql = 'INSERT INTO ITEMS (name, description) VALUES (?, ?)'
        const params = [item.name, item.description];
        database.run(sql, params, function(_err) {
            callback(this?.lastID);
        })
    },
    readAll: (callback: (items: Item[]) => void) => {
        const sql = 'SELECT * FROM ITEMS'
        const params: any[] = [];
        database.all(sql, params, (_err, rows) => callback(rows)); 
    },
    read: (id: number, callback: (item?: Item) => void) => {
        const sql = 'SELECT * FROM ITEMS WHERE ID_ITEMS_INT = ?';
        const params = [id];
        database.get(sql, params, (_err, row) => callback(row));
    },
    update: (id: number, item: Item, callback: (notFound: boolean) => void) => {
        const sql = 'UPDATE ITEMS SET name = ?, description = ? WHERE ID_ITEMS_INT = ?'
        const params = [item.name, item.description, id];
        database.run(sql, params, function(_err) {
            callback(this.changes === 0);
        });
    },
    delete: (id: number, callback: (notFound: boolean) => void) => {
        const sql = 'DELETE FROM ITEMS WHERE ID_ITEMS_INT = ?';
        const params = [id];
        database.run(sql, params, function(_err) {
            callback(this.changes === 0);
        });
    },
}

export default itemsRepository;