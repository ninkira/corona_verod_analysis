
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
            backgroundColor: "rgba(255, 203, 242,  0.7)",
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
            borderColor: "rgba(117, 201, 200,  0.7)",
            backgroundColor: "rgba(117, 201, 200,  0.7)",
            fill: false,
            hidden: true
        }
        datasets[8] = {

            label: "Sektor",
            data: [],
            borderColor: "rgba(126, 120, 210, 0.4)",
            backgroundColor: "rgba(126, 120, 210, 0.4)",
            fill: false,
            hidden: true
        }
        datasets[9] = {

            label: "Vermeidung",
            data: [],
            borderColor: "rgb(48, 1, 30, 0.3)",
            backgroundColor: "rgba(48, 1, 30, 0.3)",
            fill: false,
            hidden: true
        }

        datasets[10] = {

            label: "Aufenthaltsort",
            data: [],
            borderColor: "rgb(27, 48, 34, 0.3)",
            backgroundColor: "rgba(27, 48, 34, 0.3)",
            fill: false,
            hidden: true
        }

        datasets[11] = {
 
            label: "Behinderung",
            data: [],
            borderColor: "rgb(222, 217, 226, 0.3)",
            backgroundColor: "rgba(222, 217, 226, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[12] = {

            label: "des Infektionsschutzgesetzes",
            data: [],
            borderColor: "rgb(0, 50, 73, 0.3)",
            backgroundColor: "rgba(0, 50, 73, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[13] = {

            label: "Menschen",
            data: [],
            borderColor: "rgb(126, 120, 210, 0.3)",
            backgroundColor: "rgba(126, 120, 210, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[14] = {

            label: "Quarantäne",
            data: [],
            borderColor: "rgb(50, 232, 117, 0.3)",
            backgroundColor: "rgba(50, 232, 117, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[15] = {

            label: "Wohnformen",
            data: [],
            borderColor: "rgb(86, 238, 244, 0.3)",
            backgroundColor: "rgba(86, 238, 244, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[16] = {

            label: "Feuerwehrtechnischen",
            data: [],
            borderColor: "rgb(178, 76, 99, 0.3)",
            backgroundColor: "rgba(178, 76, 99, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[17] = {

            label: "Dienstes:",
            data: [],
            borderColor: "rgb(126, 120, 210, 0.3)",
            backgroundColor: "rgba(126, 120, 210, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[18] = {

            label: "Laufbahngruppe:",
            data: [],
            borderColor: "rgb(102, 161, 130, 0.3)",
            backgroundColor: "rgba(102, 161, 130, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[19] = {

            label: "Hochschule:",
            data: [],
            borderColor: "rgb(126, 120, 210, 0.3)",
            backgroundColor: "rgba(126, 120, 210, 0.3)",
            fill: false,
            hidden: true
        }

        datasets[20] = {

            label: "Rektorat",
            data: [],
            borderColor: "rgb(29, 45, 68, 0.3)",
            backgroundColor: "rgba(29, 45, 68, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[21] = {

            label: "Hochschulgesetz:",
            data: [],
            borderColor: "rgb(13, 19, 33, 0.3)",
            backgroundColor: "rgba(13, 19, 33, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[22] = {

            label: "geändert:",
            data: [],
            borderColor: "rgb(189, 237, 224, 0.7)",
            backgroundColor: "rgba(189, 237, 224, 0.7)",
            fill: false,
            hidden: true
        }
        datasets[23] = {

            label: "Verordnung:",
            data: [],
            borderColor: "rgb(187, 219, 209, 0.7)",
            backgroundColor: "rgba(187, 219, 209, 0.7)",
            fill: false,
            hidden: true
        }
        datasets[24] = {

            label: "Angabe:",
            data: [],
            borderColor: "rgb(182, 184, 214, 0.3)",
            backgroundColor: "rgba(182, 184, 214, 0.3)",
            fill: false,
            hidden: true
        }


        datasets[25] = {

            label: "Wort",
            data: [],
            borderColor: "rgb(126, 120, 210, 0.3)",
            backgroundColor: "rgba(126, 120, 210, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[26] = {

            label: "Aufnahme:",
            data: [],
            borderColor: "rgb(111, 88, 201, 0.3)",
            backgroundColor: "rgba(111, 88, 201, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[27] = {

            label: "Mindestabstand:",
            data: [],
            borderColor: "rgb(65, 123, 90, 0.3)",
            backgroundColor: "rgba(65, 123, 90, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[28] = {

            label: "Vorkehrungen:",
            data: [],
            borderColor: "rgb(75, 63, 114, 0.3)",
            backgroundColor: "rgba(75, 63, 114, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[29] = {

            label: "Schule:",
            data: [],
            borderColor: "rgb(31, 32, 65, 0.3)",
            backgroundColor: "rgba(31, 32, 65, 0.3)",
            fill: false,
            hidden: true
        }

        datasets[30] = {

            label: "Entscheidung:",
            data: [],
            borderColor: "rgb(36, 16, 35, 0.3)",
            backgroundColor: "rgba(36, 16, 35, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[31] = {

            label: "Person:",
            data: [],
            borderColor: "rgb(107, 5, 4, 0.3)",
            backgroundColor: "rgba(107, 5, 4, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[32] = {

            label: "Besuche:",
            data: [],
            borderColor: "rgb(163, 50, 11, 0.3)",
            backgroundColor: "rgba(163, 50, 11, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[33] = {

            label: "Gewährleistung:",
            data: [],
            borderColor: "rgb(213, 230, 141, 0.3)",
            backgroundColor: "rgba(213, 230, 141, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[34] = {

            label: "Warteschlangen:     ",
            data: [],
            borderColor: "rgb(153, 102, 255, 0.3)",
            backgroundColor: "rgba(153, 102, 255, 0.3)",
            fill: false,
            hidden: true
        }


        datasets[35] = {

            label: "Mindeststandards:",
            data: [],
            borderColor: "rgb(71, 160, 37, 0.3)",
            backgroundColor: "rgba(71, 160, 37, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[36] = {

            label: "1.5 Meter:",
            data: [],
            borderColor: "rgb(174, 255, 216, 0.3)",
            backgroundColor: "rgba(174, 255, 216, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[37] = {

            label: "angefügt:",
            data: [],
            borderColor: "rgb(138, 255, 193, 0.3)",
            backgroundColor: "rgba(138, 255, 193, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[38] = {

            label: "Anforderungen:",
            data: [],
            borderColor: "rgb(143, 220, 151, 0.3)",
            backgroundColor: "rgba(143, 220, 151, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[39] = {

            label: "Staatengruppe:",
            data: [],
            borderColor: "rgb(172, 136, 135, 0.3)",
            backgroundColor: "rgba(172, 136, 135, 0.3)",
            fill: false,
            hidden: true
        }


        datasets[40] = {

            label: "Einreise:",
            data: [],
            borderColor: "rgb(159, 74, 84, 0.3)",
            backgroundColor: "rgba(159, 74, 84, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[41] = {

            label: "Staat:",
            data: [],
            borderColor: "rgb(119, 47, 26, 0.3)",
            backgroundColor: "rgba(119, 47, 26, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[42] = {

            label: "entgegen:",
            data: [],
            borderColor: "rgb(242, 166, 90, 0.3)",
            backgroundColor: "rgba(242, 166, 90, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[43] = {

            label: "betreibt:",
            data: [],
            borderColor: "rgb(245, 133, 73, 0.3)",
            backgroundColor: "rgba(245, 133, 73, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[44] = {

            label: "Regelungen:",
            data: [],
            borderColor: "rgb(238, 193, 112, 0.3)",
            backgroundColor: "rgba(238, 193, 112, 0.3)",
            fill: false,
            hidden: true
        }


        datasets[45] = {

            label: "Gruppen:",
            data: [],
            borderColor: "rgb(196, 166, 157, 0.3)",
            backgroundColor: "rgba(196, 166, 157, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[46] = {

            label: "Coronaschutzverordnung:",
            data: [],
            borderColor: "rgb(196, 166, 157, 0.3)",
            backgroundColor: "rgba(196, 166, 157, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[47] = {

            label: "NRW:",
            data: [],
            borderColor: "rgb(98, 59, 90, 0.3)",
            backgroundColor: "rgba(98, 59, 90, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[48] = {

            label: "Berufsordnung:",
            data: [],
            borderColor: "rgb(137, 96, 142, 0.3)",
            backgroundColor: "rgba(137, 96, 142, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[49] = {

            label: "Hebammen:",
            data: [],
            borderColor: "rgb(186, 149, 147, 0.3)",
            backgroundColor: "rgba(186, 149, 147, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[50] = {

            label: "Entbindungspfleger",
            data: [],
            borderColor: "rgb(237, 255, 171, 0.7)",
            backgroundColor: "rgba(237, 255, 171, 0.7)",
            fill: false,
            hidden: true
        }
        datasets[51] = {

            label: "Nutzung",
            data: [],
            borderColor: "rgb(200, 255, 190, 0.7)",
            backgroundColor: "rgba(200, 255, 190, 0.7)",
            fill: false,
            hidden: true
        }
        datasets[52] = {

            label: "Kinder",
            data: [],
            borderColor: "rgb(111, 237, 183, 0.3)",
            backgroundColor: "rgba(111, 237, 183, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[53] = {

            label: "Stunden",
            data: [],
            borderColor: "rgb(45, 216, 129, 0.3)",
            backgroundColor: "rgba(45, 216, 129, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[54] = {

            label: "Gesundheitsamt",
            data: [],
            borderColor: "rgb(78, 166, 153, 0.3)",
            backgroundColor: "rgba(78, 166, 153, 0.3)",
            fill: false,
            hidden: true
        }


        datasets[55] = {

            label: "öffentlichen",
            data: [],
            borderColor: "rgb(20, 13, 79, 0.3)",
            backgroundColor: "rgba(20, 13, 79, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[56] = {

            label: "Betrieb",
            data: [],
            borderColor: "rgb(28, 11, 25, 0.3)",
            backgroundColor: "rgba(28, 11, 25, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[57] = {

            label: "öffnet",
            data: [],
            borderColor: "rgb(115, 111, 114, 0.3)",
            backgroundColor: "rgba(115, 111, 114, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[58] = {

            label: "durchführt",
            data: [],
            borderColor: "rgb(178, 178, 178, 0.3)",
            backgroundColor: "rgba(178, 178, 178, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[59] = {

            label: "Zeugnis",
            data: [],
            borderColor: "rgb(195, 186, 186, 0.3)",
            backgroundColor: "rgba(195, 186, 186, 0.3)",
            fill: false,
            hidden: true
        }



        datasets[60] = {

            label: "Robert Koch-Institut",
            data: [],
            borderColor: "rgb(154, 143, 151, 0.3)",
            backgroundColor: "rgba(154, 143, 151, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[61] = {

            label: "Rückverfolgbarkeit",
            data: [],
            borderColor: "rgb(130, 221, 240, 0.3)",
            backgroundColor: "rgba(130, 221, 240, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[62] = {

            label: "Coronaeinreiseverordnung",
            data: [],
            borderColor: "rgb(82, 150, 165, 0.3)",
            backgroundColor: "rgba(82, 150, 165, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[63] = {

            label: "unverzüglich",
            data: [],
            borderColor: "rgb(246, 194, 139, 0.3)",
            backgroundColor: "rgba(246, 194, 139, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[64] = {

            label: "Kindertageseinrichtungen",
            data: [],
            borderColor: "rgb(252, 215, 173, 0.7)",
            backgroundColor: "rgba(252, 215, 173, 0.7)",
            fill: false,
            hidden: true
        }


        datasets[65] = {

            label: "Beschäftigte",
            data: [],
            borderColor: "rgb(165, 117, 72, 0.3)",
            backgroundColor: "rgba(165, 117, 72, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[66] = {

            label: "zuständigen",
            data: [],
            borderColor: "rgb(243, 117, 43, 0.3)",
            backgroundColor: "rgba(243, 117, 43, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[67] = {

            label: "Verpflichtungen",
            data: [],
            borderColor: "rgb(247, 157, 92, 0.3)",
            backgroundColor: "rgba(247, 157, 92, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[68] = {

            label: "Infektionsgeschehen",
            data: [],
            borderColor: "rgb(245, 47, 87, 0.3)",
            backgroundColor: "rgba(245, 47, 87, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[69] = {

            label: "Coronavirus",
            data: [],
            borderColor: "rgb(162, 0, 33, 0.3)",
            backgroundColor: "rgba(162, 0, 33, 0.3)",
            fill: false,
            hidden: true
        }

        datasets[70] = {

            label: "SARS-CoV-2",
            data: [],
            borderColor: "rgb(53, 40, 29, 0.3)",
            backgroundColor: "rgba(53, 40, 29, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[71] = {

            label: "Großbetrieb",
            data: [],
            borderColor: "rgb(52, 229, 255, 0.3)",
            backgroundColor: "rgba(52, 229, 255, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[72] = {

            label: "Fleischwirtschaft",
            data: [],
            borderColor: "rgb(49, 133, 252, 0.3)",
            backgroundColor: "rgba(49, 133, 252, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[73] = {

            label: "Risikogebiet",
            data: [],
            borderColor: "rgb(173, 189, 255, 0.3)",
            backgroundColor: "rgba(173, 189, 255, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[74] = {

            label: "Teilnehmern",
            data: [],
            borderColor: "rgb(183, 79, 111, 0.3)",
            backgroundColor: "rgba(183, 79, 111, 0.3)",
            fill: false,
            hidden: true
        }


        datasets[75] = {

            label: "7-Tages-Inzidenz",
            data: [],
            borderColor: "rgb(216, 130, 157, 0.3)",
            backgroundColor: "rgba(216, 130, 157, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[76] = {

            label: "Fest",
            data: [],
            borderColor: "rgb(237, 216, 61, 0.3)",
            backgroundColor: "rgba(237, 216, 61, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[77] = {

            label: "Schutzmaßnahmen",
            data: [],
            borderColor: "rgb(98, 139, 72, 0.3)",
            backgroundColor: "rgba(98, 139, 72, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[78] = {

            label: "Veranstaltungen",
            data: [],
            borderColor: "rgb(5, 178, 220, 0.3)",
            backgroundColor: "rgba(5, 178, 220, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[79] = {

            label: "Versammlungen",
            data: [],
            borderColor: "rgb(0, 67, 133, 0.3)",
            backgroundColor: "rgba(0, 67, 133, 0.3)",
            fill: false,
            hidden: true
        }



        datasets[80] = {

            label: "Mund-Nase-Bedeckung",
            data: [],
            borderColor: "rgb(8, 124, 167, 0.3)",
            backgroundColor: "rgba(8, 124, 167, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[81] = {

            label: "Mitglied",
            data: [],
            borderColor: "rgb(3, 56, 96, 0.3)",
            backgroundColor: "rgba(3, 56, 96, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[82] = {

            label: "Gremium",
            data: [],
            borderColor: "rgb(6, 26, 107, 0.3)",
            backgroundColor: "rgba(6, 26, 107, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[83] = {

            label: "zulässig",
            data: [],
            borderColor: "rgb(238, 108, 77, 0.3)",
            backgroundColor: "rgba(238, 108, 77, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[84] = {

            label: "Getränken",
            data: [],
            borderColor: "rgb(243, 141, 104, 0.3)",
            backgroundColor: "rgba(243, 141, 104, 0.3)",
            fill: false,
            hidden: true
        }


        datasets[85] = {

            label: "23 Uhr",
            data: [],
            borderColor: "rgb(51, 49, 46, 0.3)",
            backgroundColor: "rgba(51, 49, 46, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[86] = {

            label: "6 Uhr",
            data: [],
            borderColor: "rgb(23, 163, 152, 0.3)",
            backgroundColor: "rgba(23, 163, 152, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[87] = {

            label: "Akademische",
            data: [],
            borderColor: "rgb(71, 77, 2, 0.3)",
            backgroundColor: "rgba(71, 77, 2, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[88] = {

            label: "Verlängerung",
            data: [],
            borderColor: "rgb(105, 5, 0, 0.3)",
            backgroundColor: "rgba(105, 5, 0, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[89] = {

            label: "verlängert",
            data: [],
            borderColor: "rgb(143, 57, 133, 0.3)",
            backgroundColor: "rgba(143, 57, 133, 0.3)",
            fill: false,
            hidden: true
        }





        datasets[90] = {

            label: "Alltagsmaske",
            data: [],
            borderColor: "rgb(199, 219, 230, 0.3)",
            backgroundColor: "rgba(199, 219, 230, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[91] = {

            label: "Speisen",
            data: [],
            borderColor: "rgb(181, 190, 198, 0.3)",
            backgroundColor: "rgba(181, 190, 198, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[92] = {

            label: "Verkaufsstelle",
            data: [],
            borderColor: "rgb(179, 103, 155, 0.3)",
            backgroundColor: "rgba(179, 103, 155, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[93] = {

            label: "Umkreis",
            data: [],
            borderColor: "rgb(191, 177, 193, 0.3)",
            backgroundColor: "rgba(191, 177, 193, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[94] = {

            label: "Produktion",
            data: [],
            borderColor: "rgb(147, 75, 0, 0.3)",
            backgroundColor: "rgba(147, 75, 0, 0.3)",
            fill: false,
            hidden: true
        }


        datasets[95] = {

            label: "Gesundheitsbehörde",
            data: [],
            borderColor: "rgb(255, 134, 0, 0.3)",
            backgroundColor: "rgba(255, 134, 0, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[96] = {

            label: "Kunden",
            data: [],
            borderColor: "rgb(80, 81, 104, 0.3)",
            backgroundColor: "rgba(80, 81, 104, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[97] = {

            label: "Testpflicht",
            data: [],
            borderColor: "rgb(179, 192, 164, 0.3)",
            backgroundColor: "rgba(179, 192, 164, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[98] = {

            label: "Gebiet",
            data: [],
            borderColor: "rgb(220, 196, 142, 0.7)",
            backgroundColor: "rgba(220, 196, 142, 0.7)",
            fill: false,
            hidden: true
        }
        datasets[99] = {

            label: "Bewegungsradius",
            data: [],
            borderColor: "rgb(125, 29, 63, 0.3)",
            backgroundColor: "rgba(125, 29, 63, 0.3)",
            fill: false,
            hidden: true
        }



        datasets[100] = {

            label: "Infektion",
            data: [],
            borderColor: "rgb(81, 37, 0, 0.3)",
            backgroundColor: "rgba(81, 37, 0, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[101] = {

            label: "Coronaregionalverordnung",
            data: [],
            borderColor: "rgb(37, 19, 81, 0.3)",
            backgroundColor: "rgba(37, 19, 81, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[102] = {

            label: "Maske",
            data: [],
            borderColor: "rgb(186, 199, 190, 0.9)",
            backgroundColor: "rgba(186, 199, 190, 0.9)",
            fill: false,
            hidden: true
        }
        datasets[103] = {

            label: "Verpflichtung",
            data: [],
            borderColor: "rgb(125, 205, 133, 0.3)",
            backgroundColor: "rgba(125, 205, 133, 0.3)",
            fill: false,
            hidden: true
        }
        datasets[104] = {

            label: "Klassen",
            data: [],
            borderColor: "rgb(39, 24, 126, 0.3)",
            backgroundColor: "rgba(39, 24, 126, 0.3)",
            fill: false,
            hidden: true
        }


        datasets[105] = {

            label: "Coronabetreuungsverordnung",
            data: [],
            borderColor: "rgb(221, 255, 217, 0.9)",
            backgroundColor: "rgba(221, 255, 217, 0.9)",
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
            datasets[10].data.push(record["Aufenthaltsort"]);
            datasets[11].data.push(record["Behinderung"]);
            datasets[12].data.push(record["des Infektionsschutzgesetzes:"]);
            datasets[13].data.push(record["Menschen:"]);
            datasets[14].data.push(record["Quarantäne:"]);
            datasets[15].data.push(record["Wohnformen:"]);
            datasets[16].data.push(record["Feuerwehrtechnischen:"]);
            datasets[17].data.push(record["Dienstes:"]);
            datasets[18].data.push(record["Laufbahngruppe:"]);
            datasets[19].data.push(record["Hochschule:"]);
            datasets[20].data.push(record["Rektorat"]);
            datasets[21].data.push(record["Hochschulgesetz:"]);
            datasets[22].data.push(record["geändert:"]);
            datasets[23].data.push(record["Verordnung:"]);
            datasets[24].data.push(record["Angabe:"]);
            datasets[25].data.push(record["Wort:"]);
            datasets[26].data.push(record["Aufnahme:"]);
            datasets[27].data.push(record["Mindestabstand:"]);
            datasets[28].data.push(record["Vorkehrungen:"]);
            datasets[29].data.push(record["Schule:"]);
            datasets[30].data.push(record["Entscheidung:"]);
            datasets[31].data.push(record["Person:"]);
            datasets[32].data.push(record["Besuche:"]);
            datasets[33].data.push(record["Gewährleistung:"]);
            datasets[34].data.push(record["Warteschlangen:"]);
            datasets[35].data.push(record["Mindeststandards:"]);
            datasets[36].data.push(record["1.5 Meter:"]);
            datasets[37].data.push(record["angefügt:"]);
            datasets[38].data.push(record["Anforderungen:"]);
            datasets[39].data.push(record["Staatengruppe:"]);
            datasets[40].data.push(record["Einreise:"]);
            datasets[41].data.push(record["Staat:"]);
            datasets[42].data.push(record["entgegen:"]);
            datasets[43].data.push(record["betreibt:"]);
            datasets[44].data.push(record["Regelungen:"]);
            datasets[45].data.push(record["Gruppen:"]);
            datasets[46].data.push(record["Coronaschutzverordnung:"]);
            datasets[47].data.push(record["NRW:"]);
            datasets[48].data.push(record["Berufsordnung:"]);
            datasets[49].data.push(record["Hebammen:"]);

            datasets[50].data.push(record["Entbindungspfleger:"]);
            datasets[51].data.push(record["Nutzung:"]);
            datasets[52].data.push(record["Kinder:"]);
            datasets[53].data.push(record["Stunden:"]);
            datasets[54].data.push(record["Gesundheitsamt:"]);
            datasets[55].data.push(record["öffentlichen:"]);
            datasets[56].data.push(record["Betrieb:"]);
            datasets[57].data.push(record["öffnet:"]);
            datasets[58].data.push(record["durchführt:"]);
            datasets[59].data.push(record["Zeugnis:"]);


            datasets[60].data.push(record["Robert Koch-Institut:"]);
            datasets[61].data.push(record["Rückverfolgbarkeit:"]);
            datasets[62].data.push(record["Coronaeinreiseverordnung:"]);
            datasets[63].data.push(record["unverzüglich:"]);
            datasets[64].data.push(record["Kindertageseinrichtungen:"]);
            datasets[65].data.push(record["Beschäftigte:"]);
            datasets[66].data.push(record["zuständigen:"]);
            datasets[67].data.push(record["Verpflichtungen:"]);
            datasets[68].data.push(record["Infektionsgeschehen:"]);
            datasets[69].data.push(record["Coronavirus:"]);


            datasets[70].data.push(record["SARS-CoV-2:"]);
            datasets[71].data.push(record["Großbetrieb:"]);
            datasets[72].data.push(record["Fleischwirtschaft:"]);
            datasets[73].data.push(record["Risikogebiet:"]);
            datasets[74].data.push(record["Teilnehmern:"]);
            datasets[75].data.push(record["7-Tages-Inzidenz:"]);
            datasets[76].data.push(record["Fest:"]);
            datasets[77].data.push(record["Schutzmaßnahmen:"]);
            datasets[78].data.push(record["Veranstaltungen:"]);
            datasets[79].data.push(record["Versammlungen:"]);


            datasets[80].data.push(record["Mund-Nase-Bedeckung:"]);
            datasets[81].data.push(record["Mitglied:"]);
            datasets[82].data.push(record["Gremium:"]);
            datasets[83].data.push(record["zulässig:"]);
            datasets[84].data.push(record["Getränken:"]);
            datasets[85].data.push(record["23 Uhr:"]);
            datasets[86].data.push(record["6 Uhr:"]);
            datasets[87].data.push(record["Akademische:"]);
            datasets[88].data.push(record["Verlängerung:"]);
            datasets[89].data.push(record["verlängert:"]);




            datasets[90].data.push(record["Alltagsmaske:"]);
            datasets[91].data.push(record["Speisen:"]);
            datasets[92].data.push(record["Verkaufsstelle:"]);
            datasets[93].data.push(record["Umkreis:"]);
            datasets[94].data.push(record["Produktion:"]);
            datasets[95].data.push(record["Gesundheitsbehörde:"]);
            datasets[96].data.push(record["Kunden:"]);
            datasets[97].data.push(record["Testpflicht:"]);
            datasets[98].data.push(record["Gebiet:"]);
            datasets[99].data.push(record["Bewegungsradius:"]);
            datasets[100].data.push(record["Infektion:"]);
            datasets[101].data.push(record["Coronaregionalverordnung:"]);
            datasets[102].data.push(record["Maske:"]);
            datasets[103].data.push(record["Verpflichtung:"]);
            datasets[104].data.push(record["Klassen:"]);
            datasets[105].data.push(record["Coronabetreuungsverordnung:"]);


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




