
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
                console.log("ret.term_records: " + ret.term_records);
                tabelle_term.create_tabelle_term(ret.term_records);

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

    tabelle_term.create_tabelle_term = function (term_records) {
        console.log("create tabelle term");
        console.log("term_records: " + term_records);
    
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




