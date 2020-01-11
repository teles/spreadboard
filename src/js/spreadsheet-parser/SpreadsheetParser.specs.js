import test from "ava";
import SpreadsheetParser from "./SpreadsheetParser.js";

const simpleSpreadsheet = {
    feed: {
        entry: [{
            gs$cell: {
                row: "1",
                col: "1",
                $t: "Nome"
            }
        }, {
            gs$cell: {
                row: "1",
                col: "2",
                $t: "Idade"
            }
        }, {
            gs$cell: {
                row: "2",
                col: "1",
                $t: "José Teles"
            }
        }, {
            gs$cell: {
                row: "2",
                col: "2",
                $t: "31"
            }
        }, {
            gs$cell: {
                row: "3",
                col: "1",
                $t: "Jesus de Nazare"
            }
        }, {
            gs$cell: {
                row: "3",
                col: "2",
                $t: "33"
            }
        }],
        title: {
            $t: "Sample Spreadsheet"
        },
        link: [{
            href: "https://docs.google.com/spreadsheets/d/klh234j12h3412jh34KAJHSkdhjsk/pubhtml"
        }]
    }
};

test("Consegue traduzir uma planilha simples", t => {
    const emptySpreadsheet = new SpreadsheetParser(simpleSpreadsheet);

    const expectedSpreadsheet = {
        "title": "Sample Spreadsheet",
        "href": "klh234j12h3412jh34KAJHSkdhjsk",
        "id": "klh234j12h3412jh34KAJHSkdhjsk_1",
        "$configs": {
            "theme": "info",
            "template": "basic",
            "adapter": {
                "Nome": "{{Nome}}",
                "Idade": "{{Idade}}"
            }
        },
        "rows": [{
            "$id": 1,
            "Nome": "José Teles",
            "$data": {
                "Nome": "José Teles",
                "Idade": "31"
            },
            "Idade": "31"
        }, {
            "$id": 2,
            "Nome": "Jesus de Nazare",
            "$data": {
                "Nome": "Jesus de Nazare",
                "Idade": "33"
            },
            "Idade": "33"
        }]
    };

    t.is(emptySpreadsheet.$configs.theme, expectedSpreadsheet.$configs.theme);
    t.is(emptySpreadsheet.$configs.template, expectedSpreadsheet.$configs.template);
    t.is(emptySpreadsheet.$configs.adapter.Idade, expectedSpreadsheet.$configs.adapter.Idade);
    t.is(emptySpreadsheet.$configs.adapter.Nome, expectedSpreadsheet.$configs.adapter.Nome);

    t.is(emptySpreadsheet.title, expectedSpreadsheet.title);
    t.is(emptySpreadsheet.href, expectedSpreadsheet.href);
    t.is(emptySpreadsheet.id, expectedSpreadsheet.id);
    t.is(emptySpreadsheet.rows.length, expectedSpreadsheet.rows.length);

    emptySpreadsheet.rows.forEach((row, index) => {
        t.is(row.$data.text, expectedSpreadsheet.rows[index].$data.text);
        t.is(row.$data.title, expectedSpreadsheet.rows[index].$data.title);
    });

});

test("Consegue entender uma configuracao basica", t => {

    const tab = {
        "id": "1qQVqf4n9TBg1p1Uu7kDZyR3ApZUJYVs7XcuB7YuOVEc",
        "adapter": {
            "title": "Nome da pessoa: {{Nome}}",
            "text": "Idade do cabra: {{Idade}}"
        },
        "template": "boxes-plus-images",
        "theme": "warning"
    };

    const expected = {
        "$configs": {
            "theme": "warning",
            "template": "boxes-plus-images",
            "adapter": {
                "title": "Nome da pessoa: {{Nome}}",
                "text": "Idade do cabra: {{Idade}}"
            }
        },
        "rows": [
            {
                "$id": 1,
                "Nome": "José Teles",
                "$data": {
                    "title": "Nome da pessoa: José Teles",
                    "text": "Idade do cabra: 31"
                },
                "Idade": "31"
            },
            {
                "$id": 2,
                "Nome": "Jesus de Nazare",
                "$data": {
                    "title": "Nome da pessoa: Jesus de Nazare",
                    "text": "Idade do cabra: 33"
                },
                "Idade": "33"
            }
        ]
    };

    const withConfigurationsSpreadsheet = new SpreadsheetParser(simpleSpreadsheet, tab);
    t.is(withConfigurationsSpreadsheet.$configs.theme, expected.$configs.theme);
    t.is(withConfigurationsSpreadsheet.$configs.template, expected.$configs.template);
    t.is(withConfigurationsSpreadsheet.$configs.adapter.Idade, expected.$configs.adapter.Idade);
    t.is(withConfigurationsSpreadsheet.$configs.adapter.Nome, expected.$configs.adapter.Nome);

    t.is(withConfigurationsSpreadsheet.rows.length, expected.rows.length);

    withConfigurationsSpreadsheet.rows.forEach((row, index) => {
        t.is(row.$data.text, expected.rows[index].$data.text);
        t.is(row.$data.title, expected.rows[index].$data.title);
    });

});
