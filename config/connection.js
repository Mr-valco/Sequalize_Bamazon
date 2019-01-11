var mysql = require('mysql');
var connection;

if(proccess.env.JAWSDB_URL){
    connection = mysql.createConnection(process.env.JAWSDB_URL);
}else {
    connection = mysql.createConnection({
        port: 3306,
        host: 'e764qqay0xlsc4cz.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'sstnryk7qg9enige',
        password: 'ccc23sa2cgfra2lt',
        database: 'q7jgcojzslns5t0a'
    });
};

connection.connect();
module.exports = connection;