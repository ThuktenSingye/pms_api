const {createPool} = require('mysql');
// opening and maintaning a database connection for each user is costly hence using create pool
// once the connection is created it is place in pool and its is used again so that new connection does 
// does not have to be established without having to create connection again.


const pool = createPool({
    port:process.env.DB_PORT,
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASS,
    database:process.env.MYSQL_DB,
});

module.exports = pool;
