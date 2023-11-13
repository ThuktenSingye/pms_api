const {createPool} = require('mysql');
// opening and maintaning a database connection for each user is costly hence using create pool
// once the connection is created it is place in pool and its is used again so that new connection does 
// does not have to be established without having to create connection again.


const pool = createPool({
    port:3306,
    host:'bzc6c2melygnnhlau8tu-mysql.services.clever-cloud.com',
    user:'usdfrdeselzcl4qf',
    password:'EFOFhkKyjBMVb0U1k6X9',
    database:'bzc6c2melygnnhlau8tu',
    connectionLimit:10
});

module.exports = pool;
