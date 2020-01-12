import test from "ava";
import SpreadsheetParser from "./SpreadsheetParser.js";

const generateJSONSpreadsheet = (data) => {
    return {
        "feed": {
            "title": {
                "$t": data.title
            },
            "link": [{
                "href": data.link
            }],
            "entry": data.entries.map((row, rowIndex) => {
                return row.map((column, columnIndex) => {
                    return {
                        "gs$cell": {
                            "$t": column,
                            "row": rowIndex + 1 + "",
                            "col": columnIndex + 1 + ""
                        }
                    };
                });
            }).reduce((acc, val) => acc.concat(val), [])
        }
    };
};

const simpleSpreadsheetData = {
    "entries": [
        ["Nome", "Idade"],
        ["José Teles", "31"],
        ["Jesus de Nazaré", "33"]
    ],
    "title": "Sample Spreadsheet",
    "link": "https://docs.google.com/spreadsheets/d/klh234j12h3412jh34KAJHSkdhjsk/pubhtml"
};

const simpleSpreadsheet = generateJSONSpreadsheet(simpleSpreadsheetData);

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
            "Nome": "Jesus de Nazaré",
            "$data": {
                "Nome": "Jesus de Nazaré",
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
                "Nome": "Jesus de Nazaré",
                "$data": {
                    "title": "Nome da pessoa: Jesus de Nazaré",
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

test("Consegue entender espaços nas chaves da planilha", t => {
    const plusSpacesSpreadsheetData = {
        "entries": [
            ["Nome", "Idade", "Tipo de pessoa"],
            ["Freddie Mercury", "51", "Boa"],
            ["Rainha da Inglaterra", "80", "Ok"]
        ],
        "title": "Sample Spreadsheet",
        "link": "https://docs.google.com/spreadsheets/d/123/pubhtml"
    };

    const tab = {
        "adapter": {
            "title": "Tipo: {{Tipo de pessoa}}"
        }
    };

    const withSpacesSpreadsheet = new SpreadsheetParser(generateJSONSpreadsheet(plusSpacesSpreadsheetData), tab);
    t.is(withSpacesSpreadsheet.rows[0].$data.title, "Tipo: Boa");
    t.is(withSpacesSpreadsheet.rows[1].$data.title, "Tipo: Ok");

});
test("Encontra o id dado um pageNumber", t => {

    const data = {
        "entries": [
            ["List"],
            ["Item"]
        ],
        "title": "123 Empty",
        "link": "https://docs.google.com/spreadsheets/d/123abc/pubhtml"
    };
    const spreadsheet = new SpreadsheetParser(generateJSONSpreadsheet(data));
    t.is(spreadsheet.id, "123abc_1");

    const spreadsheetWithPageNumber78 = new SpreadsheetParser(generateJSONSpreadsheet(data), {pageNumber: 78});
    t.is(spreadsheetWithPageNumber78.id, "123abc_78");

});