const Mysqli = require('mysqli');


let conn = new Mysqli( {
    host: 'localhost',
        post : 3306,
        user: 'root',
        password: 'Jayant@2703',
        db: 'mega_shop',
        socketPath : '/Applications/MAMP/tmp/mysql/mysql.sock'

});
let db = conn.emit(false, '');

module.exports = {
    database: db
};