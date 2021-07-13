
/*global $,uihelper,sysbase,dotize,console,root,global,self,document,uientry,define /
/global async */
(function () {
    "use strict";

    var linechart_js = {};

    var root = typeof self === 'object' && self.self === self && self
    typeof global === 'object' && global.global === global && global
    this;

    // AJAX Aufruf für Daten
    linechart_js.get_data = function () {
        console.log("linechartdata get_data funktioniert")
        try {
            var jqxhr = $.ajax({
                method: "GET",
                crossDomain: false,
                url: "google_data",
                data: {

                }
            }).done(function (r1) {

                var ret = JSON.parse(r1);

                console.log("Erfolg: " + ret.message);
                linechart_js.create_linechart(ret.google_records);

            }).fail(function (err) {

                console.log(ret.message);
                return;
            }).always(function () {
                //nope lol warum das
            });

        } catch (err) {
            console.log(err);
            return;

        }

    };

    linechart_js.create_linechart = function (google_records) {
        console.log("create linechart");
        // Mixed Chart für später 
        var xlabels = [];
        var datasets = [];

        datasets[0] = {
          
            label: "covid",
            data: [],
            borderColor: "rgba(255, 203, 242,  0.7)",
            backgroundColor:  "rgba(255, 203, 242,  0.7)",
            fill: false
            
        }

        datasets[1] = {
          
            label: "Schnelltest",
            data: [],
            borderColor: "rgba(75, 192, 192, 0.4",
            backgroundColor: "rgba(75, 192, 192, 0.4",
            fill: false
        }
        datasets[2] = {
           
            label: "Betreuung",
            data: [],
            borderColor: "rgba(236, 188, 253,  0.4)",
            backgroundColor: "rgba(236, 188, 253,  0.4)",
            fill: false,
            hidden: true
        }
        datasets[3] = {
           
            label: "Behörde",
            data: [],
            borderColor: "rgba(25, 175, 145, 0.4)",
            backgroundColor: "rgba(25, 175, 145, 0.4)",
            fill: false,
            hidden: true
        }
        datasets[4] = {
            
            label: "Einrichtung",
            data: [],
            borderColor: "rgba(226, 175, 255,  0.4)",
            backgroundColor: "rgba(226, 175, 255,  0.4)",
            fill: false,
            hidden: true
        }
        datasets[5] = {
         
            label: "Hygiene",
            data: [],
            borderColor: "rgba(216, 187, 255,  0.4)",
            backgroundColor: "rgba(216, 187, 255,  0.4)",
            fill: false
        }
        datasets[6] = {
         
            label: "Infektionsschutzgesetz",
            data: [],
            borderColor: "rgba(208, 209, 255,  0.4)",
            backgroundColor: "rgba(208, 209, 255,  0.4)",
            fill: false,
            hidden: true
        }
        datasets[7] = {
            
            label: "Personen",
            data: [],
            borderColor: "rgba(200, 231, 255,  0.7)",
            backgroundColor: "rgba(200, 231, 255,  0.7)",
            fill: false,
            hidden: true
        }
        datasets[8] = {
         
            label: "Sektor",
            data: [],
            borderColor: "rgba(54, 162, 235, 0.4)",
            backgroundColor: "rgba(54, 162, 235, 0.4)",
            fill: false,
            hidden: true
        }
        datasets[9] = {
          
            label: "Vermeidung",
            data: [],
            borderColor: "rgb(153, 102, 255, 0.3)",
            backgroundColor: "rgba(153, 102, 255, 0.3)",
            fill: false,
            hidden: true
        }

        for (var i = 0; i < google_records.length; i++) {
            var record = google_records[i];
            console.log("Keys: " + Object.keys(record))

            // übernahmen
            xlabels.push([record["Week"], record[""]]);
            datasets[0].data.push(record["covid"]);
            datasets[1].data.push(record["Schnelltest"]);
            datasets[2].data.push(record["Betreuung"]);
            datasets[3].data.push(record["Behörde"]);
            datasets[4].data.push(record["Einrichtung"]);
            datasets[5].data.push(record["Hygiene"]);
            datasets[6].data.push(record["Infektionsschutzgesetz"]);
            datasets[7].data.push(record["Personen"]);
            datasets[8].data.push(record["Sektor"]);
            datasets[9].data.push(record["Vermeidung"]);

            // bool - Kontrolle ob vorhanden



            // Auslesen der Tabelle - such nach den drei häufigsten Begriffen
        }

        var cconfig = {
            type: 'line',

            data: {
                labels: xlabels,
                datasets: datasets
            },
            options: {
                // Äußeres Gerüst
           
                responsive: true,
                title: {
                    display: true,
                    text: "Google Trends"
                },
                scales: {
                    x: {
                        beginAtZero: true,
                      
                    },
                    y: {
                        beginAtZero: true,
                       

                       
                    }
                }
                // Darstellung Mouse Hoover über Säulen (Bars)


            }

        };
        //var chart = new Chart($('#myChart'), chartDefault);
        var canvas = document.getElementById('test-line-chart');
        var ctx = canvas.getContext("2d");
        var myLine = "test-line-chart";
        window[myLine] = new Chart(ctx, cconfig);
    };







    /* standardisierte Mimik zur Integration mit App, Browser und node.js
     */

    if (typeof module === 'object' && module.exports) {
        // Node.js
        module.exports = linechart_js;
    } else if (typeof define === 'function' && define.amd) {
        // AMD / RequireJS
        define([], function () {
            return linechart_js;
        });
    } else {
        // included directly via <script> tag
        root.linechart_js = linechart_js;
    }
}());




