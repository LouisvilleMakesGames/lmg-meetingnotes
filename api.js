var express = require('express'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    db = require('mysql'),
    dbconfig = require('./dbconfig.js');

var pool = db.createPool(dbconfig);
/*{
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'lmg',
    password: 'makegamesMF3r',
    database: 'lmg',
    debug: false
});
*/
var handleErrorConnection = function (err, connection, resp, action) {
    if (err) {
        connection.release();
        if (action !== undefined && typeof (action) === 'function') {
            action(err, resp);
        } else {
            resp.json({ "code": 100, "status": "Error in connection database" });
        }
        return true;
    }
}

//passport
//sqlize

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, resp, next) {
    resp.send("Hello from home route");
});

app.post("/meeting", function (req, resp) {
    if (!req.body) {
        return resp.sendStatus(400);
    }

    var payload = req.body,
        insertData;
    
    console.log("Payload", payload);
    insertData = {
        StartDate: payload.startTime,
        Location: payload.location,
        MembersPresent: payload.members.join(','),
        TreasurersReport: payload.treasurersReport,
        SubmittedBy: payload.submitter        
    };
    
    pool.getConnection(function (err, connection) {
        if(!handleErrorConnection(err, connection, resp)){
            connection.query("INSERT INTO meetingnotes SET ?", insertData, function(err, res){
                connection.release();
                if(!err){
                    resp.json({meetingid: res.insertId});
                }else{
                    throw err;                    
                }
            });
        }
        
         connection.on('error', function (err) {
            console.log("Error on connection");
            resp.json({ "code": 100, "status": "Error in connection database" });
            return;
        });
    });
});

app.get("/meetingnotes", function (req, resp) {
    console.log("WHOA!!");
    pool.getConnection(function (err, connection) {
        if (err) {
            console.error("Failed to get connection", err);
            connection.release();
            resp.json({ "code": 100, "status": "Error in connection database" });
            return;
        }

        connection.query("select * from meetingnotes m LEFT JOIN announcements a ON m.ID = a.MeetingID LEFT JOIN motions mo ON m.ID = mo.MeetingID", function (err, rows) {
            connection.release();
            if (!err) {
                resp.json(rows);
            }
        });

        connection.on('error', function (err) {
            console.log("Error on connection");
            resp.json({ "code": 100, "status": "Error in connection database" });
            return;
        });
    });
});
app.listen("3001");
