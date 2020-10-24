let http = require('http');
let url = require('url');
let fs = require('fs');
let qs = require('querystring');
let mime = require('mime');
let mysql = require('mysql');

// my module part

// get the query string split with '?'
function getQString(url) {
    let pos = url.lastIndexOf('?');
    if (pos == -1) return {'pre': url, 'suf': ''};
    return {'pre': url.substr(0, pos), 'suf': url.substr(pos + 1, url.length - pos)};
}

// the type after the '.'
function getDotType(url) {
    let pos = url.lastIndexOf('.');
    return url.substr(pos + 1, url.length - pos - 1);
}

//let getByteLen = val => Buffer.byteLength(String(val), 'utf8');

// SQL query part

let pool = mysql.createPool ({
    connectionLimit: 5,
    host: 'localhost',
    user: 'polarischiba',
    password: 'Lin01055006@',
    database: 'tmr_clan'
});

async function query(sql) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, conn) {
            if (err) reject(err);
            return conn.query(sql, function(err, result) {
                conn.release();
                if (err) reject(err);
                resolve(result);
            });
        });
    });
}

// Server part

let Server = http.createServer(function(req, res) {
    // the way send data
    function sender(status, msg, type = 'text/plain', header = {}) {
        res.writeHead(status, {
            'Content-Type': type,
            //'Content-Length': getByteLen(msg),
            ...header
        });
        res.write(msg, 'utf8');
        res.end();
    }
    
    // the way send data with GET and fs
    function sendGetFile (target) {
        fs.readFile('../' + target, (err, contents) => {
            if (err) {
                throw err;
            } else {
                sender(200, contents, mime.getType(getDotType(target)));
            }
        });
    }
    
    // deal with the method GET
    if (req.method == 'GET') {
        
        let url_data = getQString(req.url);
        console.log(req.url);
        console.log(url_data);
        if (url_data.suf == '') {
            if (url_data.pre == '/') url_data.pre = '/index.html';
            sendGetFile(url_data.pre);
        } else {
            let req_data = qs.parse(url_data.suf);
            query(`select * from ${req_data.sql}`)
            .then(rel_sql => {
                let rel = [];
                Object.keys(rel_sql).forEach(idx => {
                    rel[rel_sql[idx].id] = {'name': rel_sql[idx].name, 'value': rel_sql[idx].value};
                });
                rel = JSON.stringify(rel);
                sender(200, rel, mime.getType(rel));
            });
            
        }
    }
});

Server.listen(7122);