var express = require('express');
var db = require('../db');
var router = express.Router();

// 전화번호로 사용자 정보 조회
router.get('/:phone', function(req, res, next) {
    var phone = req.params.phone;
    
    var sql = "select * " +
              "from bestfood_member " +
              "where phone = ? limit 1;";
    
    console.log("sql : " + sql);
    db.get().query(sql, phone, function (err, rows) {   // 여러개의 매개변수는 배열로 전달 [?, ?, ..] 
        console.log("rows : " + JSON.stringify(rows));
        console.log("rows.length : " + rows.length);
        
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.sendStatus(400);
        }
    });
});

// 새로운 사용자 전화번호 등록
router.post('/phone', function(req, res) {
    var phone = req.body.phone;
    
    var sql_count = "select count(*) as cnt " +
                    "from bestfood_member " +
                    "where phone = ?;";
    var sql_insert = "insert into bestfood_member (phone) values(?);";
    
    console.log("sql_count : " + sql_count);
    db.get().query(sql_count, phone, function (err, rows) {
        console.log(rows);
        console.log(rows[0].cnt);
        
        if(rows[0].cnt > 0) {
            return res.sendStatus(400);
        }
        
        console.log("sql_insert : " + sql_insert);
        db.get().query(sql_insert, phone, function (err, result) {
            if (err) return res.sendStatus(400);
            
            console.log("result.insertId : " + result.insertId);
            res.status(200).send('' + result.insertId);
        });
    });
});

module.exports = router;
