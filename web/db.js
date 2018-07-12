var mysql = require('mysql');

var pool;

// 데이터베이스 커넥션 풀 생성 함수
exports.connect = function() {
    pool = mysql.createPool({
        connectionLimit : 100,
        host : 'localhost',
        user : 'root',
        password : '5792423',
        database : 'bestfood'
    });
}

// 데이터베이스 커넥션 풀 반환 함수
exports.get = function() {
    return pool;
}