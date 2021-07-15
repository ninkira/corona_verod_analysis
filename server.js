var express = require('express');
var app = express();
var path = require("path");
var fs = require("fs");
var csv = require('fast-csv');
var iconv = require('iconv-lite')
app.use(express.static(path.join(__dirname, "static")));

app.get('/', function (req, res) {
    res.sendFile(path.resolve("static/index.html"));
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});

app.get("/csv", function (req, res) {

    var filename = path.join(__dirname, "static");
    filename = path.join(filename, "data");
    filename = path.join(filename, "verordnung_dummy_0.csv");
    //filename = path.join(filename, "alleverordnungen.csv");
    var counter = 0;

    var records = [];
    fs.createReadStream(filename)
        // TO-DO: Codierung Detection
        // siehe: https://www.npmjs.com/package/chardet
        // .pipe(iconv.decodeStream('iso-8859-15'))
        // .pipe(iconv.decodeStream('utf8'))
        .pipe(csv.parse({
            headers: true,
            delimiter: "\t", // tab zeichen 
            ignoreEmpty: true
        }))
        .on("data", function (data) {

            var that = this;
            that.pause();
            counter++;
            var coronakeys = Object.keys(data);
            // Verarbeitung der Daten
            if (counter === 1) {
                for (var i = 0; i < coronakeys.length; i++) {
                    console.log("Keys: " + coronakeys[i] + "=> " + data[coronakeys[i]]);
                }


            }

            records.push(data);

            // console.log(JSON.stringify(keys, null, " "))
            that.resume();
        })
        .on("end", function () {
            var smsg = JSON.stringify({
                error: false,
                message: "CSV wurde gelesen: " + counter,
                records: records
            })

            res.writeHead(200, {
                "Content-Type": "application/text",
                "Access-Control-Allow-Origin": "*"
            });
            res.end(smsg);
            return;
        });
});

app.get("/google_data", function (req, res) {
    var filename = path.join(__dirname, "static");
    filename = path.join(filename, "data");
    filename = path.join(filename, "google_begriffe.json");
    // var filename = path.join(__dirname, "google_begriffe.json");
    var google_records = [];

    fs.readFile(filename, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        } try {
            google_records = JSON.parse(jsonString)
            console.log("Entire data set: ", google_records)
            var smsg = JSON.stringify({
                error: false,
                message: "JSON wurde gelesen: " + google_records,
                google_records: google_records
            })

            res.writeHead(200, {
                "Content-Type": "application/text",
                "Access-Control-Allow-Origin": "*"
            });
            res.end(smsg);
            return;
        } catch (err) {
            console.log('Error parsing JSON string: ', err)
        }
    })
    /*
        fs.createReadStream(filename, 'utf8', (err, jsonString))
            .pipe(JSON.parse(jsonString))
            .on("data", function (data) {
    
                var that = this;
                that.pause();
                counter++;
                // Verarbeitung der Daten
                if (counter === 1) {
                    console.log("Keys: " + data);
    
                }
    
                google_records.push(data);
    
                // console.log(JSON.stringify(keys, null, " "))
    
    
    
                that.resume();
            })
            .on("end", function () {
                var smsg = JSON.stringify({
                    error: false,
                    message: "CSV wurde gelesen: ",
                    google_records: google_records
                })
    
                res.writeHead(200, {
                    "Cotent-Type": "application/text",
                    "Access-Control-Allow-Origin": "*"
                });
                res.end(smsg);
                return;
            });
    */
});


app.get("/term_data", function (req, res) {
    var filename = path.join(__dirname, "static");
    filename = path.join(filename, "data");
    filename = path.join(filename, "verordnungen_all_with_addressee.json");
    console.log("Filename: " + filename);
    var term_record = [];

    fs.readFile(filename, 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        } try {
            term_record = JSON.parse(jsonString)
            console.log("Entire data set: ", term_record)
            var smsg = JSON.stringify({
                error: false,
                message: "JSON wurde gelesen: " + term_record,
                term_record: term_record
            })

            res.writeHead(200, {
                "Content-Type": "application/text",
                "Access-Control-Allow-Origin": "*"
            });
            res.end(smsg);
            return;
        } catch (err) {
            console.log('Error parsing JSON string: ', err)
        }
    })

});