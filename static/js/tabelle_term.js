
/*global $,uihelper,sysbase,dotize,console,root,global,self,document,uientry,define /
/global async */
(function () {
    "use strict";

    var tabelle_term = {};

    var root = typeof self === 'object' && self.self === self && self
    typeof global === 'object' && global.global === global && global
    this;

    // AJAX Aufruf für Daten
    tabelle_term.get_data = function () {
        console.log("tabelle term data get_data funktioniert")
        try {
            var jqxhr = $.ajax({
                method: "GET",
                crossDomain: false,
                url: "term_data",
                data: {

                }
            }).done(function (r1) {

                var ret = JSON.parse(r1);
                console.log("Erfolg: " + ret.message);
                tabelle_term.create_tabelle_term(ret.term_record);

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

    tabelle_term.create_tabelle_term = function (term_record) {
        console.log("create tabelle term");

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
            backgroundColor: "rgba(75, 192, 192, 0.2",
            borderColor: "rgb(75, 192, 192)",
            borderWidth: 1
        }

        datasets[1] = {
            label: "Begriff 2",
            data: [],
            datalabel: [],
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            borderWidth: 1
        }
        datasets[2] = {
            label: "Begriff 3",
            data: [],
            datalabel: [],
            backgroundColor: "rgba(153, 102, 255, 0.2)",
            borderColor: "rgb(153, 102, 255)",
            borderWidth: 1
        }





        for (var i = 0; i < term_record["verordnungen"].length; i++) {
            var record = term_record["verordnungen"][i];
            var term_names = record["top-3"];
            console.log("Starte auslesen");
            // übernahmen
            xlabels.push([record["metadata"][0]["name"], record["metadata"][2]["effectiveDate"]]);
            for (var j = 0; j < term_names.length; j++) {
                var term_name = term_names[j];

                if (j === 0) {
                    console.log("erster begriff: ");
                    console.log(Object.values(term_name)[0] + " : " + Object.keys(term_name)[0]);
                    datasets[0].data.push(Object.values(term_name)[0]); // häufigkeit 1
                    datasets[0].datalabel.push(Object.keys(term_name)[0]); // Begriff 1
                }
                if (j === 1) {
                    console.log("zweiter begriff: ");
                    console.log(Object.values(term_name)[0] + " : " + Object.keys(term_name)[0]);
                    datasets[1].data.push(Object.values(term_name)[0]); // häufigkeit 1
                    datasets[1].datalabel.push(Object.keys(term_name)[0]); // Begriff 1
                }
                if (j === 2) {
                    console.log("dritter begriff: ");
                    console.log(Object.values(term_name)[0] + " : " + Object.keys(term_name)[0]);
                    datasets[2].data.push(Object.values(term_name)[0]); // häufigkeit 1
                    datasets[2].datalabel.push(Object.keys(term_name)[0]); // Begriff 1
                }
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
                    text: "Top 3 Begriffe in Corona Verordnung"
                },
                // Darstellung Mouse Hoover über Säulen (Bars)
                plugins: {
                    tooltip: {
                        
                        callbacks: {
                            label: function (context) {
                                var dsind = context.dataIndex;
                                console.log("dsind " + dsind);
                                var label = context.dataset.datalabel[dsind] + ":" + context.dataset.data[dsind];
                               
                               // console.log("label: " + label);
                               return label;
                            }
                        }
                    }
                },

                scales: {
                    x: {
                        stacked: true
                    },
                    y: {
                        stacked: true
                    }
                }
            }
        };
        //var chart = new Chart($('#myChart'), chartDefault);
        var canvas = document.getElementById('myChart');
        var ctx = canvas.getContext("2d");
        window.myLine = new Chart(ctx, cconfig);
    };







    /* standardisierte Mimik zur Integration mit App, Browser und node.js
     */

    if (typeof module === 'object' && module.exports) {
        // Node.js
        module.exports = tabelle_term;
    } else if (typeof define === 'function' && define.amd) {
        // AMD / RequireJS
        define([], function () {
            return tabelle_term;
        });
    } else {
        // included directly via <script> tag
        root.tabelle_term = tabelle_term;
    }
}());




