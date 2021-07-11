
/*global $,uihelper,sysbase,dotize,console,root,global,self,document,uientry,define /
/global async */
(function () {
    "use strict";



    var tabelle_js = {};

    var root = typeof self === 'object' && self.self === self && self
    typeof global === 'object' && global.global === global && global
    this;





    // AJAX Aufruf für Daten
    tabelle_js.get_data = function () {
        try {
            var jqxhr = $.ajax({
                method: "GET",
                crossDomain: false,
                url: "csv",
                data: {

                }
            }).done(function (r1, textStatus, jsXHR) {

                var ret = JSON.parse(r1);
                console.log("Erfolg: " + ret.message);
                tabelle_js.create_chart(ret.records);

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

    tabelle_js.create_chart = function (records) {

        // Mixed Chart für später 
        var xlabels = [];
        var datasets = []; // Daten für die eigentliche Grafik
        var data1 = []; // Begriff 1
        var data2 = []; // Begriff 2
        var data3 = []; // Begriff 3

        // Container mit config für die meistgesuchten Begriffe - aus diesen werden die Säulen erzeugt
        datasets[0] = {
            label: "Begriff 1",
            data: [],
            datalabel: [],
            backgroundColor: "pink"
        }

        datasets[1] = {
            label: "Begriff 2",
            data: [],
            datalabel: [],
            backgroundColor: "green"
        }
        datasets[2] = {
            label: "Begriff 3",
            data: [],
            datalabel: [],
            backgroundColor: "yellow"
        }





        for (var i = 0; i < records.length; i++) {
            var record = records[i];
            var fieldnames = Object.keys(record);


            // übernahmen
            xlabels.push([record["Kürzel"], record["Veröffentlichung"]]);
            // bool - Kontrolle ob vorhanden

            var f1 = false;
            var f2 = false;
            var f3 = false;

            var f;
            // Auslesen der Tabelle - such nach den drei häufigsten Begriffen
            for (var j = 0; j < fieldnames.length; j++) {
                var fieldname = fieldnames[j];
                if (fieldname.startsWith("Begriff 1")) {
                    f1 = true; // bool check is tru
                    f = record[fieldname].split(","); // ausplittung der daten um die höufigkeit und den begriff zu zeiehen
                    datasets[0].data.push(f[1]); // häufigkeit 1
                    datasets[0].datalabel.push(f[0]); // Begriff 1
                }
                if (fieldname.startsWith("Begriff 2")) {
                    f2 = true; // bool check is tru
                    f = record[fieldname].split(","); // ausplittung der daten um die höufigkeit und den begriff zu zeiehen
                    datasets[1].data.push(f[1]); // häufigkeit 1
                    datasets[1].datalabel.push(f[0]); // Begriff 1
                }
                if (fieldname.startsWith("Begriff 3")) {
                    f3 = true; // bool check is tru
                    f = record[fieldname].split(","); // ausplittung der daten um die höufigkeit und den begriff zu zeiehen
                    datasets[2].data.push(f[1]); // häufigkeit 1
                    datasets[2].datalabel.push(f[0]); // Begriff 1
                }
            }

            if (f1 === false) {
                datasets[0].data.push(0); // Häufigkeit 1
                datasets[0].datalabel.push("undefiniert"); // Begriff 1
            }
            if (f2 === false) {
                datasets[1].data.push(0); // Häufigkeit 1
                datasets[1].datalabel.push("undefiniert"); // Begriff 1
            }
            if (f3 === false) {
                datasets[2].data.push(0); // Häufigkeit 1
                datasets[2].datalabel.push("undefiniert"); // Begriff 1
            }
        }

        var cconfig = {

            type: 'bar',
            data: {
                labels: xlabels,
                datasets: datasets
            },
            options: {
                // Äußeres Gerüst
                responsive: true,
                title: {
                    display: true,
                    text: "Auswertung der Coronaverordnung"
                },
                // Darstellung Mouse Hoover über Säulen (Bars)
                tooltips: {
                    callbacks: {
                        labelTextColor: function (tooltipItem, chart) {
                            return "white";
                        },
                        label: function (context, data) {
                            var dsind = context.datasetIndex;
                            var label = data.datasets[dsind].datalabel[context.index] + " (" + data.datasets[dsind].data[context.index] + ")";
                            console.log(label);
                            return label;
                        }
                    }
                },


                plugins: {
                    datalabels: {
                        color: 'black',
                        font: {
                            weight: 'bold'
                        },
                        formatter: function (value, context) {
                            var dsind = context.datasetIndex;
                            var dind = context.dataIndex;
                            var label = context.dataset.datalabel[dind];
                            label += " (" + context.dataset.data[dind] + ")";
                            return label;
                        }
                    }
                },


                scales: {
                    x: [{
                        stacked: true,

                        ticks: {
                            callback: function (val, index) {
                                // Hide the label of every 2nd dataset
                                return index % 2 === 0 ? this.getLabelForValue(val) : '';
                            },
                            color: 'red',

                        }
                    }],
                    y: [{
                        beginAtZero: true,
                        stacked: true,
                      
                    }]
                }
            }
        };
        //var chart = new Chart($('#myChart'), chartDefault);
        var canvas = document.getElementById('myChart');
        var ctx = canvas.getContext("2d");
        window.myLine = new Chart(ctx, cconfig);
    }







    /* standardisierte Mimik zur Integration mit App, Browser und node.js
     */
    if (typeof module === 'object' && module.exports) {
        // Node.js
        module.exports = tabelle_js;
    } else if (typeof define === 'function' && define.amd) {
        // AMD / RequireJS
        define([], function () {
            return tabelle_js;
        });
    } else {
        // included directly via <script> tag
        root.tabelle_js = tabelle_js;
    }
}());




