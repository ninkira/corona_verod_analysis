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
                "Cotent-Type": "application/text",
                "Access-Control-Allow-Origin": "*"
            });
            res.end(smsg);
            return;
        });
});